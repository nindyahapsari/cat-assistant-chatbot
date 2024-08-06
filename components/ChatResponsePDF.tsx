import React from "react";
import { Document, Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 5,
    padding: 5,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  logo: {
    width: 300,
    height: 300,
  },
  dateTime: {
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 10,
  },

});

export default function ChatResponsePDF({ text }: { text: string }) {
  const currentDateTime = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
  
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src="/assets/whisker.png" style={styles.logo} />
        </View>
        <Text style={styles.dateTime}>
          {currentDateTime}
        </Text>
        <Text style={styles.section}>
          {text}
        </Text>
      </Page>
    </Document>
  );
}
