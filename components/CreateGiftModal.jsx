import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { normalizeImageSource } from "../utils/imageSource";

export default function CreateGiftModal({ visible, onClose, onCreated }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setImage(null);
    setName("");
    setDescription("");
    setLocation("");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!name.trim() || !description.trim() || !location.trim()) {
      onCreated({ error: "Name, description and location are required." });
      return;
    }

    setIsCreating(true);
    const gift = { id: Date.now(), name, image, description, location };
    onCreated({ gift });
    resetForm();
    setIsCreating(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
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
              onPress={handleClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel creating gift"
              className="bg-slate-200 px-5 py-3 rounded-full"
            >
              <Text className="font-KronaOne text-slate-600 text-xs">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreate}
              disabled={isCreating}
              accessibilityRole="button"
              accessibilityLabel="Create gift"
              className="bg-[#B85C38] px-5 py-3 rounded-full"
              style={{ opacity: isCreating ? 0.7 : 1 }}
            >
              {isCreating ? (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text className="text-white font-KronaOne text-xs">
                    Adding...
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-KronaOne text-xs">Add</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
