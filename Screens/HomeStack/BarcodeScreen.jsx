import React, { useState, useEffect, useLayoutEffect } from "react"
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { useNavigation } from "@react-navigation/native"
import Colors from "../../Constants/Colors"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const BarcodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Scan a Barcode" })
  }, [navigation])

  const navigation = useNavigation()

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
    setTimeout(() => {
      navigation.navigate("BookScreen", { barcode: data, type: type })
    }, 150)
    // navigation.navigate("BarcodeResultScreen", { type: type, barcode: data })
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      )}
    </View>
  )
}

export default BarcodeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: { height: windowHeight, width: windowWidth },
})
