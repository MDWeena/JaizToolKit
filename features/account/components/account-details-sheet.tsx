import { Button } from "@/components/ui/button";
import { FieldRow } from "@/features/account/components/field-row";
import type { AccountDetails } from "@/services/account";
import React, { useState } from "react";
import { Text, View } from "react-native";

type Props = {
  details: AccountDetails;
  onCopy: (text: string) => void;
  onClose: () => void;
};

export const AccountDetailsSheet: React.FC<Props> = ({ details, onCopy, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    await onCopy(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1200);
  };

  return (
    <View>
      <View className='rounded-xl bg-white p-4 border border-secondary-foreground/10'>
        <FieldRow label='Account Name' value={details.accountName} />
        <FieldRow label='Account Number' value={details.accountNumber} canCopy onCopy={() => handleCopy('accountNumber', details.accountNumber)} copied={copiedKey==='accountNumber'} />
        <FieldRow label='Branch Code/ CIF ID' value={details.branchCodeCif} canCopy onCopy={() => handleCopy('branchCodeCif', details.branchCodeCif)} copied={copiedKey==='branchCodeCif'} />
        <FieldRow label='BVN' value={details.bvn} canCopy onCopy={() => handleCopy('bvn', details.bvn)} copied={copiedKey==='bvn'} />
        <FieldRow label='ID Type' value={details.idType} />
        <FieldRow label='Branch' value={details.branch} />
        <FieldRow label='Account Type' value={details.accountType} />
        <FieldRow label='Currency' value={details.currency} />
        <FieldRow label='Account officer' value={details.accountOfficer} />
      </View>
      <View className='mt-4'>
        <Button size='lg' onPress={onClose}>
          <Text className='text-sm font-interSemiBold text-primary-foreground'>Close</Text>
        </Button>
      </View>
    </View>
  );
};


