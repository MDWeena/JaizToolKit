import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (key: string, text: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return { copyToClipboard, copiedKey };
}