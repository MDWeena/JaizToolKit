// import { Ionicons } from "@expo/vector-icons";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as Clipboard from "expo-clipboard";
// import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React, { useMemo, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { Header } from "@/components/shared";
// import { Button } from "@/components/ui/button";
// import { TextField } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
// import { useBottomSheet } from "@/contexts/BottomSheetContext";
// import { AccountDetailsSheet } from "@/features/account/components/account-details-sheet";
// import {
//     NameForm,
//     nameSchema,
//     PhoneForm,
//     phoneSchema,
//     sanitizeName,
//     sanitizePhone,
// } from "@/features/account/validation";
// import { type AccountDetails, fetchAccountDetails } from "@/services/account";

// export default function VerifyAccountScreen() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("phone-number");
//   const [submitting, setSubmitting] = useState(false);
//   const { showBottomSheet, hideBottomSheet } = useBottomSheet();


//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<{ phoneNumber?: string; name?: string }>({
//     resolver: (activeTab === "phone-number"
//       ? zodResolver(phoneSchema)
//       : zodResolver(nameSchema)) as any,
//     defaultValues:
//       activeTab === "phone-number"
//         ? ({ phoneNumber: "" } as PhoneForm)
//         : ({ name: "" } as NameForm),
//     mode: "onSubmit",
//   });

//   const onVerify = async () => {
//     setSubmitting(true);
//     try {
//       const details: AccountDetails = await fetchAccountDetails();
//       showBottomSheet(
//         <AccountDetailsSheet
//           details={details}
//           onCopy={async (text) => {
//             try {
//               await Clipboard.setStringAsync(text);
//             } catch {}
//           }}
//           onClose={hideBottomSheet}
//         />,
//         { cornerRadius: "large", snapPoints: ["50%", "85%"] }
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       <StatusBar style="auto" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//         keyboardVerticalOffset={100}
//       >
//         <ScrollView
//           className="flex-1 px-5"
//           keyboardShouldPersistTaps="handled"
//           keyboardDismissMode="on-drag"
//         >
//           {/* Header Section */}
//           <Pressable
//             hitSlop={20}
//             onPress={() => router.canGoBack() && router.dismissAll()}
//           >
//             <Ionicons name="arrow-back" size={25} />
//           </Pressable>
//           {/* Header Section */}
//           <Header title="Verify Account" />
//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
//           >
//             <TabsList className="">
//               <TabsTrigger value="phone-number" className="flex-1">
//                 Phone Number
//               </TabsTrigger>
//               <TabsTrigger value="name" className="flex-1">
//                 Name
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="phone-number">
//               <Controller
//                 control={control}
//                 name="phoneNumber"
//                 render={({ field: { value, onChange } }) => (
//                   <TextField
//                     className="!mt-3 w-full"
//                     InputProps={{
//                       placeholder: "Phone Number",
//                       textContentType: "telephoneNumber",
//                       keyboardType: "phone-pad",
//                       inputMode: "tel",
//                       value: (value as string) ?? "",
//                       onChangeText: (t) => onChange(sanitizePhone(t)),
//                     }}
//                     helperText={errors.phoneNumber?.message as string}
//                   />
//                 )}
//               />
//               <Button
//                 onPress={handleSubmit(onVerify)}
//                 size="lg"
//                 className="mt-10"
//                 disabled={submitting}
//               >
//                 <Text className="text-sm font-semibold text-primary-foreground">
//                   {submitting ? "Verifying..." : "Verify"}
//                 </Text>
//               </Button>
//             </TabsContent>
//             <TabsContent value="name">
//               <Controller
//                 control={control}
//                 name="name"
//                 render={({ field: { value, onChange } }) => (
//                   <TextField
//                     className="!mt-5 w-full"
//                     InputProps={{
//                       placeholder: "Account Name",
//                       textContentType: "name",
//                       value: (value as string) ?? "",
//                       onChangeText: (t) => onChange(sanitizeName(t)),
//                     }}
//                     helperText={errors.name?.message as string}
//                   />
//                 )}
//               />
//               <Button
//                 onPress={handleSubmit(onVerify)}
//                 size="lg"
//                 className="mt-10"
//                 disabled={submitting}
//               >
//                 <Text className="text-sm font-semibold text-primary-foreground">
//                   {submitting ? "Verifying..." : "Verify"}
//                 </Text>
//               </Button>
//             </TabsContent>
//           </Tabs>
//           {/* Details are displayed in Bottom Sheet via showBottomSheet */}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }


import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import { OfficerForm, officerSchema, sanitizeOfficerCode, sanitizeTeamName } from "@/features/account/validation";
import { Controller, useForm } from "react-hook-form";

export default function OfficerDetailsScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<OfficerForm>({
    resolver: zodResolver(officerSchema),
    defaultValues: { officerCode: "", teamName: "" },
    mode: "onSubmit",
  });

  const onSubmit = (data: OfficerForm) => {
    // Optionally sanitize before navigating
    const payload = {
      officerCode: sanitizeOfficerCode(data.officerCode),
      teamName: sanitizeTeamName(data.teamName),
    };
    reset();
    router.push("/(app)/accounts/open");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Header Section */}
          <Pressable hitSlop={20} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} />
          </Pressable>
          <Header title="Officer Details" />

          <Controller
            control={control}
            name="officerCode"
            render={({ field: { value, onChange } }) => (
              <TextField
                className="!mt-5 w-full"
                ignoreFocus
                InputProps={{
                  placeholder: "Enter PC code",
                  value,
                  onChangeText: (t) => onChange(sanitizeOfficerCode(t)),
                }}
                helperText={errors.officerCode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="teamName"
            render={({ field: { value, onChange } }) => (
              <TextField
                className="!mt-5 w-full"
                InputProps={{
                  placeholder: "756 - ABA RD PH",
                  value,
                  onChangeText: (t) => onChange(sanitizeTeamName(t)),
                }}
                helperText={errors.teamName?.message}
              />
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} size="lg" className="mt-10">
            <Text className="text-sm font-semibold text-primary-foreground">Continue</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
