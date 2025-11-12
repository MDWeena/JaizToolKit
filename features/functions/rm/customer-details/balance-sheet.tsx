import {
  UserAccountIcon,
  UserIcon,
  WalletIcon,
} from '@/assets/images/svgs/customer-details';
import { Button } from '@/components/ui/button';
import { FieldRow } from '@/features/account/components/field-row';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

type Props = {
  onCopy?: (text: string) => void;
  onClose: () => void;
};

export const BalanceSheet: React.FC<Props> = ({ onCopy, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    await onCopy?.(text);
    setCopiedKey(key);
    setTimeout(
      () => setCopiedKey((prev) => (prev === key ? null : prev)),
      1200
    );
  };

  return (
    <View>
      <View className="rounded-xl bg-white p-4 border border-secondary-foreground/10">
        <FieldRow
          leadingIcon={<UserIcon width={20} height={20} />}
          label="Account Name"
          value={'JOHN DOE MICHEAL'}
        />
        <FieldRow
          label="Account Number"
          value={'0123456789'}
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          canCopy
          onCopy={() => handleCopy('accountNumber', '0123456789')}
          copied={copiedKey === 'accountNumber'}
        />
        <FieldRow
          leadingIcon={<WalletIcon width={20} height={20} />}
          label="Available Balance"
          value={'#45,000.00'}
        />
        <FieldRow
          leadingIcon={<WalletIcon width={20} height={20} />}
          label="Cleared Balance"
          value={'#40,000.00'}
        />
        <FieldRow
          leadingIcon={<WalletIcon width={20} height={20} />}
          label="Book Balance"
          value={'#42,000.00'}
        />
        <FieldRow
          leadingIcon={<WalletIcon width={20} height={20} />}
          label="Uncleared Balance"
          value={'#42,000.00'}
        />
        <FieldRow
          leadingIcon={<WalletIcon width={20} height={20} />}
          label="Total Blocked Funds"
          value={'#0.00'}
        />
      </View>
      <View className="mt-4">
        <Button size="lg" onPress={onClose}>
          <Text className="text-sm font-interSemiBold text-primary-foreground">
            Close
          </Text>
        </Button>
      </View>
    </View>
  );
};
