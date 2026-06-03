import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useMessagesContext } from "../../context/MessagesContext";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function Mailbox() {
  const { messages, createDemoIncoming, markAsRead } = useMessagesContext();
  const [folder, setFolder] = useState("inbox");

  const filteredMessages = useMemo(
    () => messages.filter((msg) => msg.type === folder),
    [messages, folder],
  );

  return (
    <View className="flex-1 bg-[#FCF6F2]">
      <View className="px-4 pt-4 pb-2">
        <Text className="font-KronaOne text-xl text-slate-900">Mailbox</Text>
        <Text className="text-slate-500 mt-1">
          Messages for your gift contacts.
        </Text>
      </View>

      <View className="px-4 pb-2 flex-row gap-2">
        <TouchableOpacity
          onPress={() => setFolder("inbox")}
          className={`px-4 py-2 rounded-full border ${
            folder === "inbox"
              ? "bg-[#B85C38] border-[#B85C38]"
              : "bg-[#FFF8F4] border-[#EADFD8]"
          }`}
        >
          <Text
            className={`font-KronaOne text-xs ${folder === "inbox" ? "text-white" : "text-slate-700"}`}
          >
            Inbox
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFolder("sent")}
          className={`px-4 py-2 rounded-full border ${
            folder === "sent"
              ? "bg-[#B85C38] border-[#B85C38]"
              : "bg-[#FFF8F4] border-[#EADFD8]"
          }`}
        >
          <Text
            className={`font-KronaOne text-xs ${folder === "sent" ? "text-white" : "text-slate-700"}`}
          >
            Sent
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={createDemoIncoming}
          className="ml-auto px-4 py-2 rounded-full bg-slate-200"
        >
          <Text className="font-KronaOne text-xs text-slate-700">Demo msg</Text>
        </TouchableOpacity>
      </View>

      {filteredMessages.length === 0 ? (
        <View className="mx-4 mt-4 bg-[#FFF8F4] rounded-3xl border border-[#EADFD8] p-6 items-center">
          <Text className="font-KronaOne text-slate-800">No messages yet</Text>
          <Text className="text-slate-500 text-center mt-2">
            When someone contacts you, messages will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          className="px-4"
          data={filteredMessages}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => markAsRead(item.id)}
              className={`mb-3 rounded-2xl border p-4 ${
                item.read
                  ? "bg-[#FFF8F4] border-[#EADFD8]"
                  : "bg-[#FCEFEA] border-[#E7C5B8]"
              }`}
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-KronaOne text-slate-900 text-sm">
                  {item.subject}
                </Text>
                {!item.read && folder === "inbox" && (
                  <View className="bg-[#B85C38] px-2 py-1 rounded-full">
                    <Text className="text-white text-[10px] font-KronaOne">
                      NEW
                    </Text>
                  </View>
                )}
              </View>

              <Text className="text-slate-500 text-xs mt-1">
                {folder === "inbox" ? `From: ${item.from}` : `To: ${item.to}`}
              </Text>
              <Text className="text-slate-500 text-xs">
                Item: {item.itemName}
              </Text>
              <Text className="text-slate-700 mt-2">{item.body}</Text>
              <Text className="text-slate-400 text-xs mt-3">
                {formatDate(item.createdAt)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
