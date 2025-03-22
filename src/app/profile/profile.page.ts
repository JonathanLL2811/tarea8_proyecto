import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, collection, getDocs, Timestamp } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

interface UserProfile {
  id: string;
  fullName: string;
  identityNumber: string;
  birthDate: Date | null;
  phoneNumber: string;
  imageProfile: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  userProfileImage: string = 'assets/user-default.png';
  selectedImageFile: any;
  isLoading: boolean = false;
  isEditing: boolean = false;
  profiles: UserProfile[] = [];
  selectedProfileId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.minLength(13), Validators.pattern(/^[0-9]+$/)]],
      birthDate: ['', [Validators.required, this.dateValidator]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],
    });
  }

  async ngOnInit() {
    await this.loadProfiles();
  }

  async loadProfiles() {
    this.isLoading = true;
    const profilesCollection = collection(this.firestore, 'usuarios');
    const profilesSnapshot = await getDocs(profilesCollection);
    this.profiles = profilesSnapshot.docs.map((doc) => {
      const data = doc.data();
      let birthDate: Date | null = null;
      if (data['birthDate'] instanceof Timestamp) {
        birthDate = data['birthDate'].toDate();
      }
      return {
        id: doc.id,
        fullName: data['fullName'],
        identityNumber: data['identityNumber'],
        birthDate: birthDate,
        phoneNumber: data['phoneNumber'],
        imageProfile: data['imageProfile'],
      };
    });
    this.isLoading = false;
  }

  async loadProfile(profileId: string) {
    this.selectedProfileId = profileId;
    this.isEditing = true;
    const profileDoc = await getDoc(doc(this.firestore, 'usuarios', profileId));
    if (profileDoc.exists()) {
      const profileData = profileDoc.data();
      this.profileForm.patchValue({
        fullName: profileData['fullName'] || '',
        identityNumber: profileData['identityNumber'] || '',
        birthDate: profileData['birthDate'] ? (profileData['birthDate'] instanceof Timestamp ? profileData['birthDate'].toDate().toISOString().split('T')[0] : '') : '',
        phoneNumber: profileData['phoneNumber'] || '',
      });
      if (profileData['imageProfile']) {
        this.userProfileImage = profileData['imageProfile'];
      }
    }
  }

  get fullNameError() {
    return this.profileForm.get('fullName')?.invalid && this.profileForm.get('fullName')?.touched;
  }

  get identityNumberError() {
    return this.profileForm.get('identityNumber')?.invalid && this.profileForm.get('identityNumber')?.touched;
  }

  get birthDateError() {
    return this.profileForm.get('birthDate')?.invalid && this.profileForm.get('birthDate')?.touched;
  }

  get phoneNumberError() {
    return this.profileForm.get('phoneNumber')?.invalid && this.profileForm.get('phoneNumber')?.touched;
  }

  dateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  async selectProfileImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    if (image && image.dataUrl) {
      this.selectedImageFile = image.dataUrl;
    }
  }

  async saveProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      try {
        let imageUrl = this.userProfileImage;
        if (this.selectedImageFile) {
          const imageBlob = await fetch(this.selectedImageFile).then(r => r.blob());
          const imageRef = ref(this.storage, `usuarios/${this.selectedProfileId || this.auth.currentUser?.uid}/${uuidv4()}`);
          await uploadBytes(imageRef, imageBlob);
          imageUrl = await getDownloadURL(imageRef);
        }

        const profileId = this.selectedProfileId || this.auth.currentUser?.uid;
        if (profileId) {
          await setDoc(doc(this.firestore, 'usuarios', profileId), {
            ...this.profileForm.value,
            imageProfile: imageUrl,
          });
        }
        this.isLoading = false;
        this.isEditing = false;
        this.selectedProfileId = null;
        this.loadProfiles();
        console.log('Perfil guardado exitosamente');
      } catch (error) {
        this.isLoading = false;
        console.error('Error al guardar el perfil:', error);
      }
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  editProfile(profileId: string) {
    this.loadProfile(profileId);
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedProfileId = null;
  }
}