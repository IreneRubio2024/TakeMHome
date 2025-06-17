import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useGiftContext } from "../../context/GiftContext";
import { useWhishesContext } from "../../context/WhishesContext";

import Image1 from "../../assets/images/Image1.jpg";
import Image2 from "../../assets/images/Image2.jpg";
import Image3 from "../../assets/images/Image3.png";
import Image4 from "../../assets/images/Image4.png";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { gifts, addGift } = useGiftContext();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [selectedWhish, setSelectedWhish] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      image: Image1,
      name: "PoP kläder",
      description: "Fina plagg från PoP",
      location: "Kungsholmen, Stockholm",
      reserved: false,
    },
    {
      id: 2,
      image: Image2,
      name: "Klänning",
      description: "I perfekt skick",
      location: "Stureby, Stockhom",
      reserved: false,
    },
    {
      id: 3,
      image: Image3,
      name: "Gammalt bord",
      description: "Mycket att ge",
      location: "Södermalm, Stockholm",
      reserved: false,
    },
    {
      id: 4,
      image: Image4,
      name: "Vintage jacka",
      description: "Jättefin vårjacka",
      location: "Skärholmen, Stockholm",
      reserved: false,
    },
  ]);

  const newGift = {
    id: Date.now(),
    name,
    image,
    description,
  };
  const handleReserve = () => {
    const updatedItems = items.map((item) =>
      item.id === selectedWhish.id ? { ...item, reserved: true } : item
    );
    setItems(updatedItems);
    setModalVisible(false);
    addWhish(selectedWhish);
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
  const { addWhish } = useWhishesContext();

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView className="flex-1 bg-white px-2 pt-4">
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity className="items-center">
            <MaterialIcons name="checkroom" size={28} color="black" />
            <Text className="text-xs">Clothes</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <FontAwesome5 name="chair" size={28} color="black" />
            <Text className="text-xs">Forniture</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="bicycle" size={28} color="black" />
            <Text className="text-xs">Vehicles</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <MaterialIcons name="toys" size={28} color="black" />
            <Text className="text-xs">Toys</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <MaterialIcons name="more-horiz" size={28} color="black" />
            <Text className="text-xs">Others</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="bg-gray-100 rounded-full px-2 py-2 mb-2 text-sm"
          placeholder="Find..."
          placeholderTextColor="#888"
        />
        <View>
          <Text className="font-KronaOne m-2 text-[#FF631B]">News!</Text>
        </View>
        <View className="flex-row flex-wrap justify-between bg-slate-200 rounded-xl">
          {items.map((item) => (
            <View key={item.id} className="w-[46%] m-2 overflow-hidden">
              <View className="p-2">
                <Text className="text-black font-KronaOne mb-2">
                  {item.name}
                </Text>
              </View>
              <Image
                source={item.image}
                className="w-full h-40 mb-2"
                resizeMode="cover"
              />
              {item.reserved && (
                <View className="absolute bottom-0 right-1 bg-btn-warning px-3 py-1 rounded-full ">
                  <Text className="text-black font-base text-xs">Reserved</Text>
                </View>
              )}
              <View className="items-start">
                <TouchableOpacity
                  className="bg-gray-400 px-3 py-1 rounded-full"
                  onPress={() => {
                    setSelectedWhish(item);
                    setModalVisible(true);
                  }}
                >
                  <Text className="text-white font-base text-sm">More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="items-center mt-4">
        <Link href="/myPresents" asChild>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-btn-primary m-0 w-16 h-16 rounded-full items-center justify-center shadow-md"
          >
            <MaterialIcons name="add" size={36} color="white" />
          </TouchableOpacity>
        </Link>
        <Text className="text-[#FF631B] font-KronaOne">Add</Text>
      </View>

      <View>
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-11/12 p-4 rounded-xl">
              <Text className="text-lg font-KronaOne font-bold mb-4 text-center">
                New Gift
              </Text>

              <TouchableOpacity
                onPress={pickImage}
                className="bg-gray-200 h-40 rounded-xl justify-center items-center mb-4 text-gray-500"
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <Text className="font-base text-gray-500">Select Image</Text>
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Name:"
                value={name}
                onChangeText={setName}
                className="bg-gray-100 font-base rounded-xl px-4 py-2 mb-2 text-gray-500"
              />
              <TextInput
                placeholder="Description:"
                value={description}
                onChangeText={setDescription}
                className="bg-gray-100 font-base rounded-xl px-4 py-2 mb-2 text-gray-500"
              />
              <TextInput
                placeholder="Location:"
                value={location}
                onChangeText={setLocation}
                className="bg-gray-100 font-base rounded-xl px-4 py-2 mb-2 text-gray-500"
              />

              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  className="bg-btn-warning px-4 py-2 rounded-full"
                >
                  <Text className="font-KronaOne text-slate-400">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    addGift(newGift);
                    setShowModal(false);
                    setImage(null);
                    setDescription("");
                    setName("");
                  }}
                  className="bg-[#2172FF] px-4 py-2 rounded-full"
                >
                  <Text className="text-white font-KronaOne">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-11/12 p-4 rounded-xl">
              {selectedWhish && (
                <>
                  <Text className="text-2xl font-KronaOne mb-2 text-center">
                    {selectedWhish.name}
                  </Text>

                  <Image
                    source={
                      typeof selectedWhish.image === "number"
                        ? selectedWhish.image
                        : { uri: selectedWhish.image }
                    }
                    className="w-full h-48 rounded-xl mb-4"
                    resizeMode="cover"
                  />

                  <Text className="font-KronaOne mb-2 text-gray-800">
                    Description: {selectedWhish.description}
                  </Text>

                  <Text className="text-sm mb-4 font-KronaOne">
                    📍 Location: {selectedWhish.location}
                  </Text>

                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className="bg-btn-warning px-6 py-2 rounded-2xl "
                    >
                      <Text className="text-gray-400 font-KronaOne">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <View className="items-center">
                      <Link href="/myWhishes" asChild>
                        <TouchableOpacity
                          onPress={handleReserve}
                          className="bg-btn-primary px-6 py-2 rounded-2xl"
                        >
                          <Text className="text-white font-KronaOne">
                            Reserv
                          </Text>
                        </TouchableOpacity>
                      </Link>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
