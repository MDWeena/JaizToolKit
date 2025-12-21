import {
  AccountManagerIcon,
  BankIcon,
  GlobeIcon,
  UserAccountIcon,
  UserIcon,
} from "@/assets/images/svgs/customer-details";
import { Button } from "@/components/ui/button";
import { FieldRow } from "@/features/account/components/field-row";
import { GetCustomerDetailsResponse } from "@/types/api";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface Props extends GetCustomerDetailsResponse {
  onCopy?: (text: string) => void;
  onClose: () => void;
}

export const CustomerDetailsSheet: React.FC<Props> = ({
  onCopy,
  onClose,
  ...props
}) => {
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
          value={props.accountName}
        />
        <FieldRow
          label="Account Number"
          value={props.accountNumber}
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          canCopy
          onCopy={() => handleCopy("accountNumber", props.accountNumber)}
          copied={copiedKey === "accountNumber"}
        />
        <FieldRow
          leadingIcon={<GlobeIcon width={20} height={20} />}
          label="Account Nature"
          value={props.accountType}
        />
        <FieldRow
          leadingIcon={<AccountManagerIcon width={20} height={20} />}
          label="Account Manager"
          value={props.accountManager}
        />
        <FieldRow
          leadingIcon={<UserIcon width={20} height={20} />}
          label="Address"
          value={props.address}
        />
        <FieldRow
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          label="Email"
          value={props.email}
        />
        <FieldRow
          leadingIcon={<UserAccountIcon width={20} height={20} />}
          label="Mobile"
          value={props.phone}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Date Opened"
          value={props.accountOpenDate}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="PC Code"
          value={props.marketingID}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Status"
          value={props.status}
        />

        <FieldRow
          leadingIcon={<BankIcon width={20} height={20} />}
          label="Occupation"
          value={props.occupation}
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
