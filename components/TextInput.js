/* eslint-disable prettier/prettier */
import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../Core/theme";

const TextInput = ({ ...props }) => (
  <View style={styles.container}>
    <Input
      style={{...styles.input,fontSize:15}}
      selectionColor={'#8CC63E'}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
   
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: theme.colors.surface
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4
  }
});

export default memo(TextInput);