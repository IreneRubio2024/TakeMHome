import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Link, useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useGiftContext } from "../../context/GiftContext";
import { useWhishesContext } from "../../context/WhishesContext";
import { normalizeImageSource } from "../../utils/imageSource";
import AppToast from "../../components/AppToast";

import Image1 from "../../assets/images/Image1.jpg";
import Image2 from "../../assets/images/Image2.jpg";
import Image3 from "../../assets/images/Image3.png";
import Image4 from "../../assets/images/Image4.png";

const categories = [
  {
    label: "Clothes",
    icon: <MaterialIcons name="checkroom" size={20} color="#0F172A" />,
  },
  {
    label: "Home",
    icon: <FontAwesome5 name="chair" size={18} color="#0F172A" />,
  },
  {
    label: "Ride",
    icon: <Ionicons name="bicycle" size={20} color="#0F172A" />,
  },
  {
    label: "Kids",
    icon: <MaterialIcons name="toys" size={20} color="#0F172A" />,
  },
  {
    label: "Other",
    icon: <MaterialIcons name="apps" size={20} color="#0F172A" />,
  },
];

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWhish, setSelectedWhish] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isCreatingGift, setIsCreatingGift] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [items, setItems] = useState([
    {
      id: 1,
      image: Image1,
      name: "PoP klader",
      description: "Fina plagg fran PoP",
      location: "Kungsholmen, Stockholm",
      reserved: false,
    },
    {
      id: 2,
      image: Image2,
      name: "Klaning",
      description: "I perfekt skick",
      location: "Stureby, Stockholm",
      reserved: false,
    },
    {
      id: 3,
      image: Image3,
      name: "Gammalt bord",
      description: "Mycket att ge",
      location: "Sodermalm, Stockholm",
      reserved: false,
    },
    {
      id: 4,
      image: Image4,
      name: "Vintage jacka",
      description: "Jattefin varjacka",
      location: "Skarholmen, Stockholm",
      reserved: false,
    },
  ]);

  const { addGift } = useGiftContext();
  const { reserveWhish } = useWhishesContext();

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 2200);
  };

  const newGift = useMemo(
    () => ({ id: Date.now(), name, image, description, location }),
    [name, image, description, location],
  );

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

  const handleReserve = async () => {
    if (!selectedWhish) {
      showToast("Select an item first.", "error");
      return;
    }

    if (selectedWhish.reserved) {
      showToast("This item is already reserved.", "warning");
      return;
    }

    setIsReserving(true);

    const updatedItems = items.map((item) =>
      item.id === selectedWhish.id ? { ...item, reserved: true } : item,
    );

    setItems(updatedItems);
    reserveWhish({ ...selectedWhish, reserved: true });
    setModalVisible(false);
    showToast("Item reserved successfully.", "success");
    setIsReserving(false);
    router.push("/myWhishes");
  };

  const handleCreateGift = async () => {
    if (!name.trim() || !description.trim() || !location.trim()) {
      showToast("Name, description and location are required.", "error");
      return;
    }

    setIsCreatingGift(true);
    addGift(newGift);
    setShowModal(false);
    setImage(null);
    setDescription("");
    setName("");
    setLocation("");
    showToast("Gift created successfully.", "success");
    setIsCreatingGift(false);
  };

  return (
    <View className="flex-1 bg-[#FCF6F2]">
      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="bg-[#FFF8F4] rounded-3xl px-4 py-4 mb-4 border border-[#EADFD8]">
          <Text className="font-KronaOne text-lg text-slate-900">
            Discover nearby gifts
          </Text>
          <Text className="text-slate-500 mt-1">
            A small app, now with a portfolio-ready look.
          </Text>
          <TextInput
            className="bg-[#F6ECE6] rounded-2xl px-4 py-3 mt-4 text-sm text-slate-800"
            placeholder="Search by item or area"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <View
              key={category.label}
              className="mr-2 bg-[#FFF8F4] px-4 py-2 rounded-full border border-[#EADFD8] flex-row items-center"
            >
              {category.icon}
              <Text className="ml-2 text-slate-700 text-xs font-KronaOne">
                {category.label}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Text className="font-KronaOne text-slate-800 mb-2">Latest posts</Text>
        <View className="flex-row flex-wrap justify-between">
          {items.map((item) => (
            <View
              key={item.id}
              className="w-[48%] bg-[#FFF8F4] rounded-2xl mb-4 overflow-hidden border border-[#EADFD8]"
            >
              <Image
                source={normalizeImageSource(item.image)}
                className="w-full aspect-square bg-[#F6ECE6]"
                resizeMode="contain"
              />
              <View className="p-3">
                <Text className="font-KronaOne text-slate-900 text-sm">
                  {item.name}
                </Text>
                <Text className="text-slate-500 text-xs mt-1" numberOfLines={1}>
                  {item.location}
                </Text>
                <TouchableOpacity
                  className="bg-[#B85C38] mt-3 px-3 py-2 rounded-full self-start"
                  onPress={() => {
                    setSelectedWhish(item);
                    setModalVisible(true);
                  }}
                >
                  <Text className="text-white text-xs font-KronaOne">
                    See details
                  </Text>
                </TouchableOpacity>
              </View>
              {item.reserved && (
                <View className="absolute top-2 right-2 bg-amber-300 px-2 py-1 rounded-full">
                  <Text className="text-slate-900 text-[10px] font-KronaOne">
                    Reserved
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

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
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
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
                onPress={handleCreateGift}
                disabled={isCreatingGift}
                accessibilityRole="button"
                accessibilityLabel="Create gift"
                className="bg-[#B85C38] px-5 py-3 rounded-full"
                style={{ opacity: isCreatingGift ? 0.7 : 1 }}
              >
                {isCreatingGift ? (
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-4">
          <View className="bg-[#FFF8F4] w-full rounded-3xl p-5 border border-[#EADFD8]">
            {selectedWhish && (
              <>
                <Text className="text-xl font-KronaOne mb-3 text-center text-slate-900">
                  {selectedWhish.name}
                </Text>

                <Image
                  source={normalizeImageSource(selectedWhish.image)}
                  className="w-full h-52 rounded-2xl mb-4"
                  resizeMode="cover"
                />

                <Text className="text-slate-700 mb-1">
                  {selectedWhish.description}
                </Text>
                <Text className="text-slate-500 mb-4">
                  Location: {selectedWhish.location}
                </Text>

                <View className="flex-row justify-between mt-1">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-[#7A1E2C] px-5 py-3 rounded-full"
                  >
                    <Text className="text-white font-KronaOne text-xs">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleReserve}
                    disabled={selectedWhish?.reserved || isReserving}
                    accessibilityRole="button"
                    accessibilityLabel="Reserve gift"
                    className="px-5 py-3 rounded-full"
                    style={{
                      backgroundColor:
                        selectedWhish?.reserved || isReserving
                          ? "#94A3B8"
                          : "#B85C38",
                    }}
                  >
                    {isReserving ? (
                      <View className="flex-row items-center gap-2">
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text className="text-white font-KronaOne text-xs">
                          Saving...
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-white font-KronaOne text-xs">
                        {selectedWhish?.reserved ? "Reserved" : "Reserve"}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </View>
  );
}
