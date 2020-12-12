const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    _id: false,
    id: { type: Number, unique: true, required: true },
    profile: {
      login: String,
      displayName: String,
      description: String,
      email: String,
      profileImage: String,
    },
    auth: {
      accessToken: String,
      refreshToken: String,
      tokenExpiryDate: Number,
    },
    settings: {
      videoConfig: {
        width: { type: Number, default: 1920 },
        height: { type: Number, default: 1080 },
        fps: { type: Number, default: 30 },
        bitrate: { type: Number, default: 6000 * 1024 },
        hardwareRotation: { type: Boolean, default: false },
        iFrameInterval: { type: Number, default: 2 },
        rotation: { type: Number, default: 0 },
      },
      audioConfig: {
        bitrate: { type: Number, default: 128 * 1024 },
        sampleRate: { type: Number, default: 44100 },
        stereo: { type: Boolean, default: false },
        echoCanceler: { type: Boolean, default: false },
        noiseSuppressor: { type: Boolean, default: false },
      },
      darkMode: { type: String, default: 'system' },
      developerMode: { type: Boolean, default: false },
    },
  },
  { _id: false }
);

mongoose.model('users', UserSchema);
