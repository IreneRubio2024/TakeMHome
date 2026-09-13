import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CreateGiftModal from "../../components/CreateGiftModal";
import ItemDetailModal from "../../components/ItemDetailModal";
import { useGiftContext } from "../../context/GiftContext";
import { normalizeImageSource } from "../../utils/imageSource";
import { useAppToast } from "../../hooks/useAppToast";

export default function MyPresents() {
  const { gifts, addGift, removeGift } = useGiftContext();
  const [selectedGift, setSelectedGift] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showToast = useAppToast();

  const handleDeleteGift = (giftId) => {
    const removed = removeGift(giftId);
    if (!removed) {
      showToast("Gift could not be removed.", "error");
      return;
    }

    if (selectedGift?.id === giftId) {
      setModalVisible(false);
      setSelectedGift(null);
    }

    showToast("Gift removed from your list.", "success");
  };

  return (
    <View className="flex-1 bg-[#FCF6F2]">
      <View className="px-4 pt-4 pb-2">
        <Text className="font-KronaOne text-xl text-slate-900">My Gifts</Text>
        <Text className="text-slate-500 mt-1">
          Items you have published for others.
        </Text>
      </View>

      <FlatList
        className="px-4"
        style={{ flex: 1 }}
        data={gifts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
        contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View className="w-[48%] bg-[#FFF8F4] rounded-2xl border border-[#EADFD8] overflow-hidden mb-3">
            <Image
              source={normalizeImageSource(item.image)}
              className="w-full h-40 bg-[#F6ECE6]"
              resizeMode="contain"
            />
            <View className="p-3">
              <Text className="text-slate-900 font-KronaOne text-sm">
                {item.name}
              </Text>
              <Text className="text-slate-500 text-xs mt-1" numberOfLines={1}>
                {item.location || "Location not specified"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGift(item);
                  setModalVisible(true);
                }}
                className="bg-[#B85C38] px-3 py-2 rounded-full mt-3 self-start"
              >
                <Text className="text-white font-KronaOne text-xs">
                  See details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View className="px-4 pt-3 pb-4 border-t border-[#EADFD8] bg-[#FCF6F2] items-center">
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          accessibilityRole="button"
          accessibilityLabel="Add gift"
          className="bg-[#B85C38] w-full flex-row py-3 rounded-full items-center justify-center gap-2"
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text className="text-white font-KronaOne text-xs">Add Gift</Text>
        </TouchableOpacity>
      </View>
      <CreateGiftModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreated={({ gift, error }) => {
          if (error) {
            showToast(error, "error");
            return;
          }
          addGift(gift);
          setShowModal(false);
          showToast("Gift created successfully.", "success");
        }}
      />

      <ItemDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedGift}
        descriptionFallback="No description"
      >
        <View className="flex-row justify-end mt-1">
          <TouchableOpacity
            onPress={() => handleDeleteGift(selectedGift.id)}
            accessibilityRole="button"
            accessibilityLabel="Delete gift"
            className="bg-[#7A1E2C] px-5 py-3 rounded-full mr-2"
          >
            <Text className="text-white font-KronaOne text-xs">Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="bg-slate-200 px-5 py-3 rounded-full"
          >
            <Text className="text-slate-600 font-KronaOne text-xs">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </ItemDetailModal>
    </View>
  );
}
