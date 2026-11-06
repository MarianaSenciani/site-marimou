import { BatteryFull, Signal, Wifi, Bell } from 'lucide-react';
import './android-device.css';
export function AndroidStatus() {
  return <div className="android-status" aria-hidden="true"><span>9:41 <Bell /></span><i /><span><Signal /><Wifi /><BatteryFull /></span></div>;
}
