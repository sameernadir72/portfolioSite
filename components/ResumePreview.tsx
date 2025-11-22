import { Resume } from "../lib/types";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { Download } from "lucide-react";

function PdfDoc({ resume }: { resume: Resume }) {
  const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 8 },
    heading: { fontSize: 14, marginBottom: 6, fontWeight: 'bold' },
    text: { fontSize: 11 }
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.text}>{resume.summary}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text style={styles.text}>{resume.skills.join(', ')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {resume.experience.map((e, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.text}>{e.role} — {e.company} ({e.start} - {e.end ?? 'Present'})</Text>
              <Text style={styles.text}>{e.details}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {resume.education.map((ed, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.text}>{ed.degree} — {ed.school} ({ed.start} - {ed.end ?? 'Present'})</Text>
              <Text style={styles.text}>{ed.details}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default function ResumePreview({ resume }: { resume: Resume }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-slate-700">{resume.summary}</p>
        </div>
        <div>
          <h3 className="font-medium">Skills</h3>
          <p className="text-slate-600">{resume.skills.join(', ')}</p>
        </div>
        <div>
          <PDFDownloadLink document={<PdfDoc resume={resume} />} fileName="resume.pdf">
            <Button variant="default">
              <Download size={16} />
              Download PDF
            </Button>
          </PDFDownloadLink>
        </div>
      </div>
    </Card>
  );
}
