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
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useGiftContext } from "../../context/GiftContext";
import { useWhishesContext } from "../../context/WhishesContext";
import { normalizeImageSource } from "../../utils/imageSource";
import { useAppToast } from "../../hooks/useAppToast";
import CreateGiftModal from "../../components/CreateGiftModal";
import Image1 from "../../assets/images/Image1.jpg";
import Image2 from "../../assets/images/Image2.jpg";
import Image3 from "../../assets/images/Image3.jpg";
import Image4 from "../../assets/images/Image4.jpg";

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
  const [isReserving, setIsReserving] = useState(false);
  const showToast = useAppToast();
  const [items, setItems] = useState([
    {
      id: 1,
      image: Image1,
      name: "PoP Clothes",
      description: "Nice clothes from PoP",
      location: "Kungsholmen, Stockholm",
      reserved: false,
    },
    {
      id: 2,
      image: Image2,
      name: "Dress",
      description: "In perfect condition",
      location: "Stureby, Stockholm",
      reserved: false,
    },
    {
      id: 3,
      image: Image3,
      name: "Old Table",
      description: "Still has plenty to give",
      location: "Sodermalm, Stockholm",
      reserved: false,
    },
    {
      id: 4,
      image: Image4,
      name: "Vintage Jacket",
      description: "Really nice spring jacket",
      location: "Skarholmen, Stockholm",
      reserved: false,
    },
  ]);

  const { addGift } = useGiftContext();
  const { reserveWhish } = useWhishesContext();

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

  return (
    <View className="flex-1 bg-[#FCF6F2]">
      <ScrollView
        style={{ flex: 1 }}
        className="px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 20 }}
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
                className="w-full h-40 bg-[#F6ECE6]"
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
    </View>
  );
}
