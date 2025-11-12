import {
  AccountManagerIcon,
  BankIcon,
  GlobeIcon,
  UserAccountIcon,
  UserIcon,
} from '@/assets/images/svgs/customer-details';
import { Button } from '@/components/ui/button';
import { FieldRow } from '@/features/account/components/field-row';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

type Props = {
  onCopy?: (text: string) => void;
  onClose: () => void;
};

export const CustomerDetailsSheet: React.FC<Props> = ({ onCopy, onClose }) => {
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
          leadingIcon={<GlobeIcon width={20} height={20} />}
          label="Account Nature"
          value={'CUST'}
        />
        <FieldRow
          leadingIcon={<AccountManagerIcon width={20} height={20} />}
          label="Account Manager"
          value="FG000123 | MICHAEL JOHN"
        />
        <FieldRow
          leadingIcon={<UserIcon width={20} height={20} />}
          label="Address"
          value={'Somewhere street, anywhere town, Earth'}
        />
        <FieldRow
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          label="Email"
          value={'john.doe@example.com'}
        />
        <FieldRow
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          label="Mobile"
          value={'08012345678'}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Date Opened"
          value={'Sept 17, 2015'}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="PC Code"
          value={'PC123456'}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Status"
          value={'A'}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Occupation"
          value={'Software Engineer'}
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
