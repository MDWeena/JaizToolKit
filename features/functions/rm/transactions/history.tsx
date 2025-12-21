import { BackButton, Header, ListTile } from "@/components/shared";
import { Text } from "@/components/ui";
import { formatNaira, groupTransactionsByDay } from "@/lib/utils";
import { Transaction } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionHistoryScreen = () => {
  const { transactions: jsonTransactions } = useLocalSearchParams<{
    transactions: string;
  }>();

  const groupedTransactions = useMemo(() => {
    if (!jsonTransactions) return [];

    const transactions = JSON.parse(jsonTransactions) as Transaction[];

    return groupTransactionsByDay(transactions);
  }, [jsonTransactions]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="History" />

        <FlatList
          scrollEnabled={false}
          data={groupedTransactions}
          renderItem={({ item, index }) => (
            <View className="mb-5">
              <Text>{item.date}</Text>
              <View className="bg-white rounded-lg mt-2">
                <FlatList
                  scrollEnabled={false}
                  data={item.transactions}
                  renderItem={({ item: transaction }) => (
                    <>
                      <ListTile
                        containerClassName="pb-0"
                        title={transaction.narration}
                        subtitle={
                          transaction.transType === "CR" ? "Credit" : "Debit"
                        }
                        titleClassName="!font-bold"
                        leading={
                          <View className="w-[40px] h-[40px] border rounded-full flex items-center justify-center">
                            {transaction.transType === "DR" ? (
                              <Ionicons
                                name="caret-up"
                                size={18}
                                color={"red"}
                              />
                            ) : (
                              <Ionicons
                                name="caret-down"
                                size={18}
                                color={"#36B37E"}
                              />
                            )}
                          </View>
                        }
                        trailing={
                          <Text
                            className={`${transaction.transType === "DR" ? "" : "text-green-600"} !font-bold`}
                          >
                            {formatNaira(transaction.amount)}
                          </Text>
                        }
                      />
                    </>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionHistoryScreen;
