import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { GiftContext } from "../../context/GiftContext";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function myPresents() {
  const { gifts } = useContext(GiftContext);
  const [selectedGift, setSelectedGift] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [showModal, setShowModal] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

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
  return (
    <View className="flex-1 bg-white ">
      <Text className="font-KronaOne text-xl text-center py-4 text-[#FF631B] ">
        My Gifts
      </Text>
      <FlatList
        className=" bg-slate-200 m-4 rounded-2xl"
        data={gifts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", padding: 10 }}
        contentContainerStyle={{ paddingBottom: 10, margin: 10 }}
        renderItem={({ item }) => (
          <View className="w-[48%] p-1 items-start ">
            <Text className="text-lg font-KronaOne mb-1">{item.name}</Text>

            {item.image && (
              <Image
                source={
                  typeof item.image === "number"
                    ? item.image
                    : { uri: item.image }
                }
                className="w-full h-36 "
                resizeMode="cover"
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setSelectedGift(item);
                setModalVisible(true);
              }}
              className="bg-gray-400 px-4 py-1 rounded-full mt-2"
            >
              <Text className="text-white font-base text-sm">More</Text>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>

      <View className="items-center mb-12">
        <Link href="/myPresents" asChild>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-btn-primary mt-0 w-16 h-16 rounded-full items-center justify-center shadow-md"
          >
            <MaterialIcons name="add" size={36} color="white" />
          </TouchableOpacity>
        </Link>
        <Text className="text-[#FF631B] font-KronaOne">Add</Text>
      </View>
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
                <Text className="text-xl text-gray-500">Select Image</Text>
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="bg-gray-100 rounded-xl px-4 py-2 mb-2 text-gray-500"
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              className="bg-gray-100 rounded-xl px-4 py-2 mb-2 text-gray-500"
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              className="bg-gray-100 rounded-xl px-4 py-2 mb-2 text-gray-500"
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="bg-btn-warning px-4 py-2 rounded-full"
              >
                <Text className="font-KronaOne text-gray-500">Cancel</Text>
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-4 rounded-xl">
            {selectedGift && (
              <>
                <Text className="text-2xl font-KronaOne mb-2 text-center">
                  {selectedGift.name}
                </Text>

                <Image
                  source={
                    typeof selectedGift.image === "number"
                      ? selectedGift.image
                      : { uri: selectedGift.image }
                  }
                  className="w-full h-48 rounded-xl mb-4"
                  resizeMode="cover"
                />

                <Text className="font-KronaOne mb-2">
                  {selectedGift.description}
                </Text>

                <Text className="text-sm mb-4 font-KronaOne">
                  📍 Location: Enskede, Stockholm
                </Text>

                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-btn-warning px-6 py-2 rounded-full "
                  >
                    <Text className="text-gray-500 font-KronaOne">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setItems((prevItems) =>
                        prevItems.map((item) =>
                          item.id === selectedWhish.id
                            ? { ...item, reserved: true }
                            : item
                        )
                      );
                      setModalVisible(false);
                    }}
                    className="bg-btn-primary px-6 py-2 rounded-full"
                  >
                    <Text className="text-white font-KronaOne">Reserv</Text>
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
