import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, Path, Circle } from '@react-pdf/renderer';

// DISABLE HYPHENATION GLOBALLY
Font.registerHyphenationCallback(word => [word]);

// REGISTER FONTS
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { 
    padding: '30pt 45pt', 
    backgroundColor: '#FFFFFF', 
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column'
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', // Center vertically for better balance with larger image
    marginBottom: '10pt', 
    borderBottomWidth: 2, 
    borderBottomColor: '#111827', 
    borderBottomStyle: 'solid', 
    paddingBottom: '12pt' 
  },
  headerLeft: { flex: 1, paddingRight: '20pt' },
  name: { fontSize: '26pt', fontWeight: 700, color: '#111827', marginBottom: 2 },
  title: { fontSize: '10.5pt', color: '#4B5563', fontWeight: 500, marginBottom: 12, letterSpacing: 1.5 },
  
  contactGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: '12pt',
    maxWidth: '100%'
  },
  contactItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2pt',
    gap: '4pt'
  },
  contactItem: { 
    fontSize: '9pt', 
    color: '#374151', 
    fontWeight: 400
  },
  
  // LARGER IMAGE
  image: { width: '100pt', height: '100pt', borderRadius: '4pt' },
  
  body: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: '5pt'
  },
  
  section: { marginVertical: '6pt' },
  sectionTitle: { 
    fontSize: '12.5pt', 
    fontWeight: 700, 
    borderBottomWidth: 1.5, 
    borderBottomColor: '#111827', 
    borderBottomStyle: 'solid', 
    paddingBottom: '2pt', 
    marginBottom: '8pt',
    color: '#000',
    letterSpacing: 0.5
  },
  
  text: { fontSize: '10.5pt', lineHeight: 1.5, color: '#374151', textAlign: 'justify' },
  
  itemHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'baseline', 
    marginBottom: '2pt' 
  },
  itemTitle: { fontSize: '11.5pt', fontWeight: 700, color: '#111827' },
  itemDuration: { fontSize: '9.5pt', fontWeight: 700, color: '#4B5563' },
  itemSubtitle: { fontSize: '10.5pt', fontWeight: 700, color: '#4B5563', marginBottom: '4pt' },
  
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: '10pt',
    marginTop: 'auto',
    flexDirection: 'row',
    gap: '25pt'
  },
  colMain: { flex: 1.5 },
  colSide: { flex: 1 },
  
  skillItem: { fontSize: '10pt', fontWeight: 700, marginBottom: '4pt', color: '#111827' },
  langItem: { marginBottom: '8pt' },
  langName: { fontSize: '10.5pt', fontWeight: 700, color: '#111827' },
  langLevel: { fontSize: '9pt', fontWeight: 400, color: '#6B7280' }
});

const A4Template = ({ data }) => {
  const tU = (s) => (s ? s.toLocaleUpperCase('tr-TR') : '');
  
  return (
    <Document title={data.personalInfo.fullName || 'Resume'} author="ATS CV BUILDER">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{tU(data.personalInfo.fullName) || 'ADINIZ SOYADINIZ'}</Text>
            <Text style={styles.title}>{tU(data.personalInfo.title) || 'ÜNVANINIZ'}</Text>
            
            <View style={styles.contactGrid}>
              {data.personalInfo.email && (
                <View style={styles.contactItemBox}>
                  <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <Path d="m22 6-10 7L2 6" />
                  </Svg>
                  <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
                </View>
              )}
              {data.personalInfo.phone && (
                <View style={styles.contactItemBox}>
                  <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </Svg>
                  <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
                </View>
              )}
              {data.personalInfo.location && (
                <View style={styles.contactItemBox}>
                  <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <Circle cx="12" cy="10" r="3" />
                  </Svg>
                  <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
                </View>
              )}
              {data.personalInfo.linkedin && (
                <View style={styles.contactItemBox}>
                  <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <Path d="M2 9h4v12H2z" /><Circle cx="4" cy="4" r="2" />
                  </Svg>
                  <Text style={[styles.contactItem, {fontSize: '8pt'}]}>{data.personalInfo.linkedin}</Text>
                </View>
              )}
              {data.personalInfo.github && (
                <View style={styles.contactItemBox}>
                  <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5">
                    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </Svg>
                  <Text style={[styles.contactItem, {fontWeight: 700, color: '#000', fontSize: '8pt'}]}>{data.personalInfo.github}</Text>
                </View>
              )}
            </View>
          </View>
          {data.personalInfo.profileImage && <Image src={data.personalInfo.profileImage} style={styles.image} />}
        </View>

        {/* Distributed Body */}
        <View style={styles.body}>
          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tU('Özet')}</Text>
              <Text style={styles.text}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tU('Deneyimler')}</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: '12pt' }} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{tU(exp.position)}</Text>
                    <Text style={styles.itemDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{tU(exp.company)}</Text>
                  <Text style={styles.text}>{exp.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tU('Eğitim')}</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: '10pt' }} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{tU(edu.school)}</Text>
                    <Text style={styles.itemDuration}>{edu.duration}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{tU(edu.degree)}</Text>
                  {edu.description && <Text style={[styles.text, {fontSize: '9.5pt', color: '#6B7280'}]}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          ) : null}

          {data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tU('Projeler')}</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={{ marginBottom: '10pt' }} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{tU(proj.name)}</Text>
                    <Text style={styles.itemDuration}>{proj.link}</Text>
                  </View>
                  <Text style={styles.text}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <View style={styles.colMain}>
            {data.skills && data.skills.length > 0 ? (
              <View>
                <Text style={styles.sectionTitle}>{tU('Yetenekler')}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '8pt' }}>
                  {data.skills.map((s, i) => (
                    <Text key={i} style={styles.skillItem}>{`• ${tU(s.name)}`}</Text>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
          
          <View style={styles.colSide}>
            {data.languages && data.languages.length > 0 ? (
              <View>
                <Text style={styles.sectionTitle}>{tU('Diller')}</Text>
                {data.languages.map((l, i) => (
                  <View key={i} style={styles.langItem}>
                    <Text style={styles.langName}>{tU(l.name)}</Text>
                    <Text style={styles.langLevel}>{tU(l.level)}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default A4Template;
