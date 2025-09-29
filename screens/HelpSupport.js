import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

const HelpSupport = ({ navigation }) => {
    const { colors } = useTheme();

    const handlePhoneCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Phone calls are not supported on this device');
                }
            })
            .catch(err => Alert.alert('Error', 'Could not make phone call'));
    };

    const handleEmail = (email) => {
        const url = `mailto:${email}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Email is not configured on this device');
                }
            })
            .catch(err => Alert.alert('Error', 'Could not open email client'));
    };

    const contactInfo = [
        {
            id: 1,
            type: 'phone',
            title: 'Customer Support',
            value: '0713567891',
            icon: 'call-outline',
            description: 'Call us for immediate assistance'
        },
        {
            id: 2,
            type: 'phone',
            title: 'Technical Support',
            value: '0763567892',
            icon: 'phone-portrait-outline',
            description: 'Technical issues and troubleshooting'
        },
        {
            id: 3,
            type: 'email',
            title: 'Email Support',
            value: 'hostelwater@gmail.com',
            icon: 'mail-outline',
            description: 'Send us an email for detailed support'
        }
    ];

    const faqItems = [
        {
            question: 'How do I place an order?',
            answer: 'Navigate to the product you want, select the quantity, and add it to your cart. Then proceed to checkout.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept cash on delivery and various digital payment methods.'
        },
        {
            question: 'How long does delivery take?',
            answer: 'Delivery typically takes 30-60 minutes depending on your location.'
        },
        {
            question: 'Can I cancel my order?',
            answer: 'Yes, you can cancel your order within 10 minutes of placing it.'
        },
        {
            question: 'What if I have a complaint?',
            answer: 'Please contact our customer support team immediately. We take all complaints seriously.'
        }
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
            </View>

            {/* Contact Information Section */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                    Get in touch with our support team
                </Text>

                {contactInfo.map((contact) => (
                    <TouchableOpacity
                        key={contact.id}
                        style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => {
                            if (contact.type === 'phone') {
                                handlePhoneCall(contact.value);
                            } else if (contact.type === 'email') {
                                handleEmail(contact.value);
                            }
                        }}
                    >
                        <View style={styles.contactLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                                <Ionicons name={contact.icon} size={24} color={colors.primary} />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={[styles.contactTitle, { color: colors.text }]}>{contact.title}</Text>
                                <Text style={[styles.contactValue, { color: colors.primary }]}>{contact.value}</Text>
                                <Text style={[styles.contactDescription, { color: colors.textSecondary }]}>
                                    {contact.description}
                                </Text>
                            </View>
                        </View>
                        <Ionicons 
                            name={contact.type === 'phone' ? 'call' : 'mail'} 
                            size={20} 
                            color={colors.primary} 
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* FAQ Section */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                    Find answers to common questions
                </Text>

                {faqItems.map((faq, index) => (
                    <View key={index} style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
                        <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>
                    </View>
                ))}
            </View>

            {/* Support Hours */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Support Hours</Text>
                <View style={[styles.hoursCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.hoursRow}>
                        <Ionicons name="time-outline" size={20} color={colors.primary} />
                        <Text style={[styles.hoursText, { color: colors.text }]}>Monday - Friday: 8:00 AM - 8:00 PM</Text>
                    </View>
                    <View style={styles.hoursRow}>
                        <Ionicons name="time-outline" size={20} color={colors.primary} />
                        <Text style={[styles.hoursText, { color: colors.text }]}>Saturday - Sunday: 9:00 AM - 6:00 PM</Text>
                    </View>
                </View>
            </View>

            {/* Emergency Contact */}
            <View style={styles.section}>
                <View style={[styles.emergencyCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
                    <Ionicons name="warning-outline" size={24} color={colors.primary} />
                    <View style={styles.emergencyContent}>
                        <Text style={[styles.emergencyTitle, { color: colors.text }]}>Emergency Support</Text>
                        <Text style={[styles.emergencyText, { color: colors.textSecondary }]}>
                            For urgent issues outside support hours, please call our emergency line
                        </Text>
                        <TouchableOpacity 
                            style={[styles.emergencyButton, { backgroundColor: colors.primary }]}
                            onPress={() => handlePhoneCall('0713567891')}
                        >
                            <Ionicons name="call" size={16} color={colors.primaryText} />
                            <Text style={[styles.emergencyButtonText, { color: colors.primaryText }]}>Call Emergency Line</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        marginBottom: 20,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    contactLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
    },
    contactDescription: {
        fontSize: 12,
    },
    faqCard: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    faqAnswer: {
        fontSize: 14,
        lineHeight: 20,
    },
    hoursCard: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    hoursRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    hoursText: {
        fontSize: 14,
        marginLeft: 12,
    },
    emergencyCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'flex-start',
    },
    emergencyContent: {
        flex: 1,
        marginLeft: 12,
    },
    emergencyTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    emergencyText: {
        fontSize: 14,
        marginBottom: 12,
        lineHeight: 20,
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    emergencyButtonText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default HelpSupport;
