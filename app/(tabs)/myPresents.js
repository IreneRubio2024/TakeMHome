import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useGiftContext } from "../../context/GiftContext";
import { normalizeImageSource } from "../../utils/imageSource";
import AppToast from "../../components/AppToast";

export default function MyPresents() {
  const { gifts, addGift, removeGift } = useGiftContext();
  const [selectedGift, setSelectedGift] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isCreatingGift, setIsCreatingGift] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 2200);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createGift = async () => {
    if (!name.trim() || !description.trim() || !location.trim()) {
      showToast("Name, description and location are required.", "error");
      return;
    }

    setIsCreatingGift(true);

    const newGift = {
      id: Date.now(),
      name,
      image,
      description,
      location,
    };

    addGift(newGift);
    setShowModal(false);
    setImage(null);
    setName("");
    setDescription("");
    setLocation("");
    showToast("Gift created successfully.", "success");
    setIsCreatingGift(false);
  };

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
        data={gifts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
        contentContainerStyle={{ paddingBottom: 130, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View className="w-[48%] bg-[#FFF8F4] rounded-2xl border border-[#EADFD8] overflow-hidden mb-3">
            <Image
              source={normalizeImageSource(item.image)}
              className="w-full aspect-square bg-[#F6ECE6]"
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

      <View className="absolute bottom-6 self-center items-center">
        <Link href="/myPresents" asChild>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-[#B85C38] w-16 h-16 rounded-full items-center justify-center"
          >
            <MaterialIcons name="add" size={34} color="white" />
          </TouchableOpacity>
        </Link>
        <Text className="text-slate-700 font-KronaOne mt-2 text-xs">
          Add Gift
        </Text>
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/55 px-4">
          <View className="bg-[#FFF8F4] w-full rounded-3xl p-5 border border-[#EADFD8]">
            <Text className="text-lg font-KronaOne text-center text-slate-900 mb-4">
              Create Gift
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              className="bg-[#F6ECE6] h-40 rounded-2xl justify-center items-center mb-4 overflow-hidden"
            >
              {image ? (
                <Image
                  source={normalizeImageSource(image)}
                  className="w-full h-full rounded-2xl"
                  resizeMode="contain"
                />
              ) : (
                <Text className="text-slate-500 font-KronaOne text-xs">
                  Select image
                </Text>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="bg-[#F6ECE6] rounded-xl px-4 py-3 mb-2 text-slate-700"
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              className="bg-[#F6ECE6] rounded-xl px-4 py-3 mb-2 text-slate-700"
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              className="bg-[#F6ECE6] rounded-xl px-4 py-3 mb-4 text-slate-700"
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                accessibilityRole="button"
                accessibilityLabel="Cancel creating gift"
                className="bg-slate-200 px-5 py-3 rounded-full"
              >
                <Text className="font-KronaOne text-slate-600 text-xs">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={createGift}
                disabled={isCreatingGift}
                accessibilityRole="button"
                accessibilityLabel="Create gift"
                className="bg-[#B85C38] px-5 py-3 rounded-full"
                style={{ opacity: isCreatingGift ? 0.7 : 1 }}
              >
                {isCreatingGift ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text className="text-white font-KronaOne text-xs">Adding...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-KronaOne text-xs">Add</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/55 px-4">
          <View className="bg-[#FFF8F4] w-full rounded-3xl p-5 border border-[#EADFD8]">
            {selectedGift && (
              <>
                <Text className="text-xl font-KronaOne mb-3 text-center text-slate-900">
                  {selectedGift.name}
                </Text>

                <Image
                  source={normalizeImageSource(selectedGift.image)}
                  className="w-full h-52 rounded-2xl mb-4"
                  resizeMode="cover"
                />

                <Text className="text-slate-700 mb-1">
                  {selectedGift.description || "No description"}
                </Text>
                <Text className="text-slate-500 mb-4">
                  Location: {selectedGift.location || "Not specified"}
                </Text>

                <View className="flex-row justify-end mt-1">
                  <TouchableOpacity
                    onPress={() => handleDeleteGift(selectedGift.id)}
                    accessibilityRole="button"
                    accessibilityLabel="Delete gift"
                    className="bg-[#7A1E2C] px-5 py-3 rounded-full mr-2"
                  >
                    <Text className="text-white font-KronaOne text-xs">
                      Delete
                    </Text>
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
              </>
            )}
          </View>
        </View>
      </Modal>

      <AppToast visible={toast.visible} message={toast.message} type={toast.type} />
    </View>
  );
}
