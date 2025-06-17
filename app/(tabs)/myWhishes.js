import React, { useState } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useWhishesContext } from "../../context/WhishesContext";

export default function MyWhishes() {
  const { whishes } = useWhishesContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <View className="flex-1 bg-white">
      <Text className="font-KronaOne text-xl text-center py-4 text-[#FF631B]">
        My Reserved Whishes
      </Text>

      {whishes.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">
          No reservations yet.
        </Text>
      ) : (
        <FlatList
          className=" bg-slate-200 m-4 rounded-2xl"
          data={whishes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="w-[48%] rounded-xl mb-4 mt-4 p-1">
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={
                    typeof item.image === "number"
                      ? item.image
                      : { uri: item.image }
                  }
                  style={{ width: "100%", height: 100, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text className="text-lg font-KronaOne mt-2">{item.name}</Text>
              <Text className="text-sm text-gray-700">{item.description}</Text>
              <Text className="text-sm text-gray-500">{item.location}</Text>

              <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
              >
                <View className="flex-1 justify-center items-center bg-black/50">
                  <View className="bg-white p-6 rounded-2xl w-[90%] shadow-xl">
                    <Text className="font-KronaOne text-[#FF631B] text-center mb-4">
                      Contact and pick up
                    </Text>

                    <Text className="text-center mb-2 font-KronaOne">
                      {selectedItem?.name}
                    </Text>

                    <TextInput
                      placeholder="Write a message..."
                      value={message}
                      onChangeText={setMessage}
                      className="border border-gray-300 rounded-xl p-3 mb-4"
                      multiline
                      numberOfLines={4}
                    />

                    <View className="flex-row justify-between">
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="bg-btn-warning px-6 py-3 rounded-full"
                      >
                        <Text className="font-KronaOne text-center text-slate-500">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          console.log("Message sent:", message);
                          setMessage("");
                          setModalVisible(false);
                        }}
                        className="bg-btn-primary px-6 py-3 rounded-full"
                      >
                        <Text className="text-white font-KronaOne text-center">
                          Send
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        />
      )}
    </View>
  );
}
