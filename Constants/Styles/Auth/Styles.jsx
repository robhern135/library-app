import { StyleSheet } from "react-native"
import Colors from "../../Colors"

export const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  emailContainer: {
    width: "100%",
  },
  emailIcon: { position: "absolute", top: 18, left: 10 },
  passwordIcon: { position: "absolute", bottom: 17, left: 10 },
  header: {
    // fontFamily: "Montserrat_800ExtraBold",
    fontSize: 38,
    color: "black",
    marginBottom: 30,
    textAlign: "center",
  },
  subheading: {
    // fontFamily: "Montserrat_700Medium",
    fontSize: 16,
    lineHeight: 16 * 1.6,
    maxWidth: 277,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
    gap: 12,
  },
  eyeIcon: { position: "absolute", right: 15, bottom: 18 },
  input: {
    height: 54,
    backgroundColor: "rgba(0, 0, 0, .05)",
    paddingRight: 15,
    paddingLeft: 40,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 22,
    marginVertical: 3,
    width: "100%",
  },
  passwordContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    // fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    lineHeight: 16 * 1.6,
  },
  registerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 22,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    // fontFamily: "Montserrat_500Medium",
  },
  orContainer: {
    marginVertical: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  orText: {
    // fontFamily: "Montserrat_500Medium",
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "transparent",
    transform: [{ translateY: -15 }, { translateX: -19 }],
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  signUp: { flexDirection: "row", gap: 10 },

  disabledButton: {
    opacity: 0.3,
  },
})
