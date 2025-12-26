import React from "react";
import { Text, View } from "react-native";

import {
  AccountManagerIcon,
  AccountNameIcon,
  AccountTypeIcon,
  BankIcon,
  GlobeIcon,
  LocationIcon,
  UserAccountIcon,
} from "@/assets/images/svgs/customer-details";
import { Button } from "@/components/ui/button";
import { FieldRow } from "@/features/account/components/field-row";
import { useClipboard } from "@/hooks/useClipboard";
import { getCurrencyName } from "@/lib/utils";
import type { VerifyAccountData } from "@/types/api";

type Props = {
  details: VerifyAccountData;
  onClose: () => void;
};

export const AccountDetailsSheet: React.FC<Props> = ({
  details,
  onClose,
}) => {
  const { copyToClipboard, copiedKey } = useClipboard();

  const handleCopy = async (key: string, text: string) => {
    await copyToClipboard(key, text);
  };

  const handleClose = () => {
    onClose();
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
            Close
          </Text>
        </Button>
      </View>
    </View>
  );
};
