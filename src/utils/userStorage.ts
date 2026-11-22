import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@groceries_profile_v1';
const ADDRESS_KEY = '@groceries_address_v1';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Islam Yelzhan',
  email: 'sensitiveyoungman@gmail.com',
  phone: '+7 707 169 90 26',
};

export const DEFAULT_ADDRESS = 'ул. Абая 10, Алматы';

export async function loadProfile(): Promise<UserProfile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function loadAddress(): Promise<string> {
  try {
    const raw = await AsyncStorage.getItem(ADDRESS_KEY);
    return raw || DEFAULT_ADDRESS;
  } catch {
    return DEFAULT_ADDRESS;
  }
}

export async function saveAddress(address: string): Promise<void> {
  await AsyncStorage.setItem(ADDRESS_KEY, address);
}