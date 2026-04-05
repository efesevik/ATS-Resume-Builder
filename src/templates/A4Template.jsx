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
    alignItems: 'center', 
    padding: '20pt',
    borderRadius: '4pt',
    marginBottom: '10pt'
  },
  headerLeft: { flex: 1, paddingLeft: '15pt' },
  name: { fontSize: '24pt', fontWeight: 700, marginBottom: 2 },
  title: { fontSize: '10.5pt', fontWeight: 500, marginBottom: 12, letterSpacing: 1.5 },
  
  contactGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: '8pt',
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
    flexGrow: 1, // Full page grow
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribute all sections EQUALLY
    paddingVertical: '5pt'
  },
  
  section: { marginVertical: '2pt' },
  sectionTitle: { 
    fontSize: '11.5pt', 
    fontWeight: 700, 
    borderBottomWidth: 1, 
    borderBottomColor: '#111827', 
    borderBottomStyle: 'solid', 
    paddingBottom: '1pt', 
    marginBottom: '4pt',
    color: '#000',
    letterSpacing: 0.5
  },
  
  text: { fontSize: '10pt', lineHeight: 1.4, color: '#374151', textAlign: 'justify' },
  
  itemHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'baseline', 
    marginBottom: '1pt' 
  },
  itemTitle: { fontSize: '11pt', fontWeight: 700, color: '#111827' },
  itemDuration: { fontSize: '9pt', fontWeight: 700, color: '#4B5563' },
  itemSubtitle: { fontSize: '10pt', fontWeight: 700, color: '#4B5563', marginBottom: '1pt' },
  
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: '12pt',
    flexDirection: 'row',
    gap: '20pt'
  },
  footerCol: { flex: 1 },
  
  skillItem: { fontSize: '9pt', fontWeight: 700, marginBottom: '3pt', color: '#111827' },
  langItem: { marginBottom: '5pt' },
  langName: { fontSize: '10pt', fontWeight: 700, color: '#111827' },
  langLevel: { fontSize: '8.5pt', fontWeight: 400, color: '#6B7280' }
});

const A4Template = ({ data }) => {
  const tU = (s) => (s ? s.toLocaleUpperCase('tr-TR') : '');
  
    const themeColor = data.personalInfo.themeColor || '#111827';
    
    // Helper to determine if text should be white or black
    const getContrastYIQ = (hexcolor) => {
      if (!hexcolor) return 'black';
      const r = parseInt(hexcolor.slice(1, 3), 16);
      const g = parseInt(hexcolor.slice(3, 5), 16);
      const b = parseInt(hexcolor.slice(5, 7), 16);
      const yiq = ((r * 299) + (g * 587) + (114 * b)) / 1000;
      return (yiq >= 128) ? '#111827' : '#FFFFFF';
    };

    const textColor = getContrastYIQ(themeColor);
    const subTextColor = (textColor === '#FFFFFF') ? '#E5E7EB' : '#4B5563';

    return (
    <Document title={data.personalInfo.fullName || 'Resume'} author="ATS CV BUILDER">
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          {data.personalInfo.profileImage && <Image src={data.personalInfo.profileImage} style={styles.image} />}
          <View style={styles.headerLeft}>
            <Text style={[styles.name, { color: textColor }]}>{tU(data.personalInfo.fullName) || 'ADINIZ SOYADINIZ'}</Text>
            <Text style={[styles.title, { color: subTextColor }]}>{tU(data.personalInfo.title) || 'ÜNVANINIZ'}</Text>
            
            <View style={styles.contactGrid}>
              {data.personalInfo.email && (
                <View style={styles.contactItemBox}>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={subTextColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <Path d="m22 6-10 7L2 6" />
                  </Svg>
                  <Text style={[styles.contactItem, { color: subTextColor }]}>{data.personalInfo.email}</Text>
                </View>
              )}
              {data.personalInfo.phone && (
                <View style={styles.contactItemBox}>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={subTextColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </Svg>
                  <Text style={[styles.contactItem, { color: subTextColor }]}>{data.personalInfo.phone}</Text>
                </View>
              )}
              {data.personalInfo.location && (
                <View style={styles.contactItemBox}>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={subTextColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <Circle cx="12" cy="10" r="3" />
                  </Svg>
                  <Text style={[styles.contactItem, { color: subTextColor }]}>{data.personalInfo.location}</Text>
                </View>
              )}
              {data.personalInfo.linkedin && (
                <View style={styles.contactItemBox}>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={subTextColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <Path d="M2 9h4v12H2z" /><Circle cx="4" cy="4" r="2" />
                  </Svg>
                  <Text style={[styles.contactItem, {fontSize: '8pt', color: subTextColor}]}>{data.personalInfo.linkedin}</Text>
                </View>
              )}
              {data.personalInfo.github && (
                <View style={styles.contactItemBox}>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </Svg>
                  <Text style={[styles.contactItem, {fontWeight: 700, color: textColor, fontSize: '8pt'}]}>{data.personalInfo.github}</Text>
                </View>
              )}
            </View>
          </View>
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

          <View style={styles.footer}>
            <View style={styles.footerCol}>
              {data.personalSkills && data.personalSkills.length > 0 ? (
                <View>
                  <Text style={styles.sectionTitle}>{tU('Kişisel Beceriler')}</Text>
                  <View style={{ flexDirection: 'column', gap: '4pt' }}>
                    {data.personalSkills.map((s, i) => (
                      <Text key={i} style={styles.skillItem}>{`• ${tU(s.name)}`}</Text>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.footerCol}>
              {data.skills && data.skills.length > 0 ? (
                <View>
                  <Text style={styles.sectionTitle}>{tU('Teknik Beceriler')}</Text>
                  <View style={{ flexDirection: 'column', gap: '4pt' }}>
                    {data.skills.map((s, i) => (
                      <Text key={i} style={styles.skillItem}>{`• ${tU(s.name)}`}</Text>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
            
            <View style={styles.footerCol}>
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
        </View>
      </Page>
    </Document>
  );
};

export default A4Template;
