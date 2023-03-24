import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  profile: {
    login: string
    displayName: string
    description: string
    email: string
    profileImage: string
  }
  auth: {
    accessToken: string
    refreshToken: string
    tokenExpiryDate: number
  }
  settings: {
    videoConfig: {
      width: number
      height: number
      fps: number
      bitrate: number
      hardwareRotation: boolean
      iFrameInterval: number
      rotation: number
    }
    audioConfig: {
      bitrate: number
      sampleRate: number
      stereo: boolean
      echoCanceler: boolean
      noiseSuppressor: boolean
    }
    darkMode: string
    developerMode: boolean
  }
}

const UserProfileSchema = new Schema(
  {
    login: String,
    displayName: String,
    description: String,
    email: String,
    profileImage: String,
  },
  { _id: false }
)

const UserAuthSchema = new Schema(
  {
    accessToken: String,
    refreshToken: String,
    tokenExpiryDate: Number,
  },
  { _id: false }
)

const VideoConfigSchema = new Schema(
  {
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 },
    fps: { type: Number, default: 30 },
    bitrate: { type: Number, default: 6000 * 1024 },
    hardwareRotation: { type: Boolean, default: false },
    iFrameInterval: { type: Number, default: 0 },
    rotation: { type: Number, default: 0 },
  },
  { _id: false }
)

const AudioConfigSchema = new Schema(
  {
    bitrate: { type: Number, default: 256 * 1024 },
    sampleRate: { type: Number, default: 32000 },
    stereo: { type: Boolean, default: false },
    echoCanceler: { type: Boolean, default: false },
    noiseSuppressor: { type: Boolean, default: false },
  },
  { _id: false }
)

const UserSettingsSchema = new Schema(
  {
    videoConfig: { type: VideoConfigSchema, default: () => ({}) },
    audioConfig: { type: AudioConfigSchema, default: () => ({}) },
    darkMode: { type: String, default: 'no' },
    developerMode: { type: Boolean, default: false },
  },
  { _id: false }
)

const UserSchema = new Schema(
  {
    id: String,
    profile: { type: UserProfileSchema, required: true },
    auth: { type: UserAuthSchema, required: true },
    settings: { type: UserSettingsSchema, required: true },
  },
  { _id: false }
)

export const User = mongoose.model<UserDocument>('users', UserSchema)
