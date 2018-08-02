import { StyleSheet } from "react-native";
/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF"
  },
  centerRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center"
  },
  centerColumnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center"
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#06b87c",
    padding: 10
  },
  menuButtonText: {
    fontSize: 25,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold"
  },
  menuButtonSecondary: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10
  },
  menuButtonSecondaryText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10,
    margin: 10,
    backgroundColor: "#d35566"
  },
  estimationTextStyle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  passengerDetailsCell: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center"
  },
  borderView: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  fillRow: {
    justifyContent: "flex-start",
    flex: 1
  },
  centerRowContainerWithStandardMargin: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 20
  },
  centerColumnContainerWithStandardMargin: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 10
  },
  size20: {
    width: 20,
    height: 20
  },
  margin10: {
    margin: 10
  },
  titleTextBold: {
    flex: 1,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  publicTransportCell: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 5,
    margin: 10,
    backgroundColor: "#dddddd"
  }
});
