import React, { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { FieldRow } from "@/features/account/components/field-row";
import {
  AccountManagerIcon,
  BankIcon,
  GlobeIcon,
  UserAccountIcon,
  AccountNameIcon,
  LocationIcon,
  AccountTypeIcon,
} from "@/assets/images/svgs/customer-details";
import type { VerifyAccountData } from "@/types/api";
import { getCurrencyName } from "@/lib/utils";
import { useRouter } from "expo-router";
import { useClipboard } from "@/hooks/useClipboard";

type Props = {
  details: VerifyAccountData;
  onCopy: (text: string) => void;
  onClose: () => void;
};

export const AccountDetailsSheet: React.FC<Props> = ({
  details,
  onCopy,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const router = useRouter();
  const handleCopy = (key: string, text: string) => {
    onCopy(text);
    setCopiedKey(key);
    setTimeout(
      () => setCopiedKey((prev) => (prev === key ? null : prev)),
      1200
    );
  };

  const handleClose = () => {
    onClose();
    router.push("/(tabs)/(home)");
  };

  return (
    <View>
      <View className="p-4 bg-white border rounded-xl border-secondary-foreground/10">
        <FieldRow
          label="Account Name"
          value={details.accountName}
          leadingIcon={<AccountNameIcon width={20} height={20} />}
        />
        <FieldRow
          label="Account Number"
          value={details.accountNumber}
          canCopy
          onCopy={() => handleCopy("accountNumber", details.accountNumber)}
          copied={copiedKey === "accountNumber"}
          leadingIcon={<UserAccountIcon width={20} height={20} />}
        />
        <FieldRow
          label="Branch Code/ CIF ID"
          value={`${details.branchCode}/${details.cif}`}
          canCopy
          onCopy={() =>
            handleCopy("branchCodeCif", `${details.branchCode}/${details.cif}`)
          }
          copied={copiedKey === "branchCodeCif"}
          leadingIcon={<BankIcon width={20} height={20} />}
        />
        <FieldRow
          label="BVN"
          value={details.bvn}
          canCopy
          onCopy={() => handleCopy("bvn", details.bvn)}
          copied={copiedKey === "bvn"}
          leadingIcon={<UserAccountIcon width={20} height={20} />}
        />
        <FieldRow
          label="ID Type"
          value={details.idType}
          leadingIcon={<UserAccountIcon width={20} height={20} />}
        />
        <FieldRow
          label="Branch"
          value={details.branch}
          leadingIcon={<LocationIcon width={20} height={20} />}
        />
        <FieldRow
          label="Account Type"
          value={details.accountType}
          leadingIcon={<AccountTypeIcon width={20} height={20} />}
        />
        <FieldRow
          label="Currency"
          value={getCurrencyName(details.currency)}
          leadingIcon={<GlobeIcon width={20} height={20} />}
        />
        <FieldRow
          label="Account Officer"
          value={`${details.accountOfficerId} | ${details.accountOfficerName}`}
          leadingIcon={<AccountManagerIcon width={20} height={20} />}
        />
      </View>
      <View className="mt-4">
        <Button size="lg" onPress={handleClose}>
          <Text className="text-sm font-interSemiBold text-primary-foreground">
            Back to Home
          </Text>
        </Button>
      </View>
    </View>
  );
};
