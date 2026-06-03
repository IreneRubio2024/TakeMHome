import React, { useState } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useWhishesContext } from "../../context/WhishesContext";
import { useMessagesContext } from "../../context/MessagesContext";
import { normalizeImageSource } from "../../utils/imageSource";
import AppToast from "../../components/AppToast";

export default function MyWhishes() {
  const { whishes, removeWhish } = useWhishesContext();
  const { sendMessage } = useMessagesContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (messageText, type = "success") => {
    setToast({ visible: true, message: messageText, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 2200);
  };

  const openContactModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDeleteWhish = (whishId) => {
    const removed = removeWhish(whishId);
    if (!removed) {
      showToast("Could not remove this reservation.", "error");
      return;
    }

    if (selectedItem?.id === whishId) {
      setModalVisible(false);
      setSelectedItem(null);
      setMessage("");
    }

    showToast("Reservation removed.", "success");
  };

  return (
    <View className="flex-1 bg-[#FCF6F2]">
      <View className="px-4 pt-4 pb-2">
        <Text className="font-KronaOne text-xl text-slate-900">
          My Reserved Whishes
        </Text>
        <Text className="text-slate-500 mt-1">
          Track items you want to pick up.
        </Text>
      </View>

      {whishes.length === 0 ? (
        <View className="mx-4 mt-6 bg-[#FFF8F4] rounded-3xl border border-[#EADFD8] p-6 items-center">
          <Text className="font-KronaOne text-slate-800">
            No reservations yet
          </Text>
          <Text className="text-slate-500 text-center mt-2">
            Reserve an item from Home and it will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          className="px-4"
          data={whishes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          renderItem={({ item }) => (
            <View className="w-[49%] rounded-2xl mb-3 bg-[#FFF8F4] border border-[#EADFD8] overflow-hidden">
              <Image
                source={normalizeImageSource(item.image)}
                className="w-full aspect-square bg-[#F6ECE6]"
                resizeMode="contain"
              />
              <View className="p-4">
                <Text className="text-[15px] font-KronaOne text-slate-900">
                  {item.name}
                </Text>
                <Text className="text-xs text-slate-600 mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
                <Text className="text-xs text-slate-500 mt-1" numberOfLines={1}>
                  {item.location}
                </Text>

                <View className="flex-row mt-3 w-full justify-between items-center">
                  <TouchableOpacity
                    onPress={() => openContactModal(item)}
                    accessibilityRole="button"
                    accessibilityLabel={`Write to owner about ${item.name}`}
                    accessibilityHint="Opens the contact form for this item"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    className="bg-[#B85C38] px-3 py-1.5 rounded-full"
                  >
                    <Text className="text-white font-KronaOne text-[11px] text-center">
                      Write to owner
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteWhish(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete reservation for ${item.name}`}
                    accessibilityHint="Removes this item from your wishlist"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    className="bg-[#7A1E2C] px-3 py-1.5 rounded-full"
                  >
                    <Text className="text-white font-KronaOne text-[11px] text-center">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/55 px-4">
          <View className="bg-[#FFF8F4] p-6 rounded-3xl w-full border border-[#EADFD8]">
            <Text className="font-KronaOne text-slate-900 text-center text-lg">
              Contact and pickup
            </Text>

            <Text className="text-center mb-4 mt-2 text-slate-500">
              {selectedItem?.name}
            </Text>

            <TextInput
              placeholder="Write a message..."
              value={message}
              onChangeText={setMessage}
              className="border border-[#EADFD8] bg-[#F6ECE6] rounded-2xl p-3 mb-4 text-slate-700"
              multiline
              numberOfLines={4}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => handleDeleteWhish(selectedItem?.id)}
                accessibilityRole="button"
                accessibilityLabel="Delete reservation"
                className="bg-[#7A1E2C] px-6 py-3 rounded-full"
              >
                <Text className="font-KronaOne text-center text-white text-xs">
                  Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Cancel message"
                className="bg-slate-200 px-6 py-3 rounded-full"
              >
                <Text className="font-KronaOne text-center text-slate-600 text-xs">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (!message.trim()) {
                    showToast("Please write a message before sending.", "error");
                    return;
                  }

                  setIsSending(true);
                  const sent = sendMessage({
                    item: selectedItem,
                    body: message,
                  });

                  if (!sent) {
                    setIsSending(false);
                    showToast("Message could not be sent.", "error");
                    return;
                  }

                  setMessage("");
                  setModalVisible(false);
                  showToast("Message sent successfully.", "success");
                  setIsSending(false);
                }}
                disabled={isSending}
                accessibilityRole="button"
                accessibilityLabel="Send message to owner"
                accessibilityHint="Sends the written message and closes this dialog"
                className="bg-[#B85C38] px-6 py-3 rounded-full"
                style={{ opacity: isSending ? 0.7 : 1 }}
              >
                {isSending ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text className="text-white font-KronaOne text-center text-xs">Sending...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-KronaOne text-center text-xs">
                    Send
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AppToast visible={toast.visible} message={toast.message} type={toast.type} />
    </View>
  );
}
