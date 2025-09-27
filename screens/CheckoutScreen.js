
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, ScrollView, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useUserProfile } from '../UserProfileContext';


const CheckoutScreen = ({ navigation }) => {
    const route = useRoute();
    const [deliveryType, setDeliveryType] = useState('standard');
    const [showTime, setShowTime] = useState(false);
    const [selectedTime, setSelectedTime] = useState('13:00');
    
    // Get address from params or fallback
    const { profile, setProfile } = useUserProfile();
    const initialAddress = `${profile?.name},\n${profile?.address},\n${profile?.phone}` || "Saman Kumara,\nBoy's Hostel,\nAriviyal nagar,Kilinochchi.\n0711234567";
    const [address, setAddress] = useState(initialAddress);
    const [card, setCard] = useState({ number: '**** **** **** 3282', holder: 'Utibe Inyang', expiry: '12/23' });
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cash'
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(10);
    const [showCardModal, setShowCardModal] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', holder: '', expiry: '' });
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('December 2, 2021');
    
    useEffect(()=>{
        const bottle=route.params.product.bottleSize.replace("L", '')
        const price=route.params.product.price.replace("Rs.", '')
        const quantity=route.params.product.quantity
        setSubtotal(bottle*quantity*price)
    },[])
    // Update address if coming back from profile
    React.useEffect(() => {
        if (route?.params?.address) {
            setAddress(route.params.address);
        }
    }, [route?.params?.address]);

  
    const handleConfirmOrder = () => {
        if (paymentMethod === 'cash') {
            navigation.navigate('OrderSuccess');
        } else {
            // Card payment process would go here
            navigation.navigate('OrderSuccess');
        }
    };

    const times = ['13:00', '16:45', '18:50', '17:45', '20:30'];

    return (
        <ImageBackground source={require('../assets/images/welcome.png')} style={styles.bg} blurRadius={2}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Checkout</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={26} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
                {/* Address */}
                <View style={styles.addressBlock}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.addressLabel}>Delivery Address</Text>
                        <Text style={styles.addressText}>{address}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { fromCheckout: true } })}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
                {/* Delivery Type */}
                <View style={styles.deliveryTypeRow}>
                    <TouchableOpacity
                        style={[styles.deliveryTypeBtn, deliveryType === 'standard' && styles.deliveryTypeBtnActive]}
                        onPress={() => { setDeliveryType('standard'); setShowTime(false); }}
                    >
                        <Text style={[styles.deliveryTypeText, deliveryType === 'standard' && styles.deliveryTypeTextActive]}>Standard{deliveryType === 'standard' && ' 10-20 Min'}</Text>
                        {deliveryType === 'standard' && <Ionicons name="checkmark-circle" size={18} color="#1E90FF" style={{ marginLeft: 6 }} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deliveryTypeBtn, deliveryType === 'schedule' && styles.deliveryTypeBtnActive]}
                        onPress={() => { setDeliveryType('schedule'); setShowTime(true); }}
                    >
                        <Text style={[styles.deliveryTypeText, deliveryType === 'schedule' && styles.deliveryTypeTextActive]}>Schedule Ahead{"\n"}Choose Your Time</Text>
                        {deliveryType === 'schedule' && <Ionicons name="checkmark-circle" size={18} color="#1E90FF" style={{ marginLeft: 6 }} />}
                    </TouchableOpacity>
                </View>
                {/* Date/Time Picker */}
                {showTime && (
                    <View style={styles.timeSection}>
                        <Text style={styles.dateLabel}>Date</Text>
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <Text style={styles.dateText}>{selectedDate}</Text>
                        </TouchableOpacity>
                        <View style={styles.timeRow}>
                            {times.map(time => (
                                <TouchableOpacity
                                    key={time}
                                    style={[styles.timeBtn, selectedTime === time && styles.timeBtnActive]}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text style={[styles.timeBtnText, selectedTime === time && styles.timeBtnTextActive]}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* Simple Calendar Modal */}
                        <Modal visible={showCalendar} transparent animationType="fade">
                            <View style={styles.calendarModalBg}>
                                <View style={styles.calendarModal}>
                                    <Text style={styles.calendarTitle}>Select Date</Text>
                                    <Calendar
                                        onDayPress={day => {
                                            setSelectedDate(day.dateString);
                                            setShowCalendar(false);
                                        }}
                                        markedDates={{
                                            [selectedDate]: { selected: true, selectedColor: '#1E90FF' },
                                        }}
                                        theme={{
                                            selectedDayBackgroundColor: '#1E90FF',
                                            todayTextColor: '#1E90FF',
                                            arrowColor: '#1E90FF',
                                            monthTextColor: '#1E90FF',
                                            textSectionTitleColor: '#1E90FF',
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.calendarCancelBtn}>
                                        <Text style={styles.calendarCancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
                {/* Payment Method Selection */}
                <Text style={styles.paymentLabel}>Payment Method</Text>
                <View style={styles.paymentMethodRow}>
                    <TouchableOpacity
                        style={[styles.paymentMethodBtn, paymentMethod === 'card' && styles.paymentMethodBtnActive]}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <Ionicons name="card-outline" size={22} color={paymentMethod === 'card' ? '#fff' : '#1E90FF'} />
                        <Text style={[styles.paymentMethodText, paymentMethod === 'card' && styles.paymentMethodTextActive]}>Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentMethodBtn, paymentMethod === 'cash' && styles.paymentMethodBtnActive]}
                        onPress={() => setPaymentMethod('cash')}
                    >
                        <Ionicons name="cash-outline" size={22} color={paymentMethod === 'cash' ? '#fff' : '#1E90FF'} />
                        <Text style={[styles.paymentMethodText, paymentMethod === 'cash' && styles.paymentMethodTextActive]}>Cash</Text>
                    </TouchableOpacity>
                </View>
                {/* Card Payment Process */}
                {paymentMethod === 'card' && (
                    <>
                        <View style={styles.cardBlock}>
                            <View style={styles.cardRow}>
                                <Text style={styles.cardType}>VISA</Text>
                                <Text style={styles.cardNumber}>{card.number}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <Text style={styles.cardHolder}>Card Holder{"\n"}{card.holder}</Text>
                                <Text style={styles.cardExpiry}>Expire{"\n"}{card.expiry}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.addCardBtn} onPress={() => setShowCardModal(true)}>
                            <Text style={styles.addCardText}>+ Add New Card</Text>
                        </TouchableOpacity>
                        {/* Card Modal */}
                        <Modal visible={showCardModal} transparent animationType="slide">
                            <View style={styles.cardModalBg}>
                                <View style={styles.cardModalBox}>
                                    <Text style={styles.cardModalTitle}>Credit / Debit</Text>
                                    <TextInput
                                        style={styles.cardInput}
                                        placeholder="Card number"
                                        value={newCard.number}
                                        onChangeText={text => setNewCard({ ...newCard, number: text })}
                                        keyboardType="numeric"
                                        maxLength={19}
                                        placeholderTextColor="#bbb"
                                    />
                                    <TextInput
                                        style={styles.cardInput}
                                        placeholder="Name on card"
                                        value={newCard.holder}
                                        onChangeText={text => setNewCard({ ...newCard, holder: text })}
                                        placeholderTextColor="#bbb"
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput
                                            style={[styles.cardInput, { flex: 1, marginRight: 8 }]}
                                            placeholder="Expiry date"
                                            value={newCard.expiry}
                                            onChangeText={text => setNewCard({ ...newCard, expiry: text })}
                                            maxLength={5}
                                            placeholderTextColor="#bbb"
                                        />
                                        <TextInput
                                            style={[styles.cardInput, { flex: 1, marginLeft: 8 }]}
                                            placeholder="Security code"
                                            value={newCard.cvc}
                                            onChangeText={text => setNewCard({ ...newCard, cvc: text })}
                                            maxLength={4}
                                            keyboardType="numeric"
                                            placeholderTextColor="#bbb"
                                        />
                                    </View>
                                    <View style={{ marginTop: 8, marginBottom: 16 }}>
                                        <Text style={styles.cardLabel}>Country</Text>
                                        <View style={styles.countryDropdown}>
                                            <Text style={styles.countryText}>Sri Lanka</Text>
                                            <Ionicons name="chevron-down" size={18} color="#1E90FF" />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                                        <TouchableOpacity
                                            style={styles.addCardBtnFull}
                                            onPress={() => {
                                                setCard({ ...newCard });
                                                setShowCardModal(false);
                                                setNewCard({ number: '', holder: '', expiry: '', cvc: '' });
                                            }}
                                        >
                                            <Text style={styles.addCardBtnTextFull}>Add Card 0.00 LKR</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: 10 }} />
                                        <TouchableOpacity style={styles.cardModalBtn} onPress={() => setShowCardModal(false)}>
                                            <Text style={styles.cardModalBtnText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
   
                {/* Order Summary */}
                <View style={styles.summaryBlock}>
                    <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Sub Total</Text><Text style={styles.summaryValue}>Rs.{subtotal}</Text></View>
                    <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery fee</Text><Text style={styles.summaryValue}>Rs.{deliveryFee}</Text></View>
                    <View style={styles.summaryRow}><Text style={styles.summaryLabelTotal}>Total</Text><Text style={styles.summaryValueTotal}>Rs.{subtotal + deliveryFee}</Text></View>
                </View>
                <TouchableOpacity style={styles.placeOrderBtn} onPress={handleConfirmOrder}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    calendarModalBg: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarModal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
     paymentMethodRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    paymentMethodBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginHorizontal: 8,
        backgroundColor: '#fff',
    },
    paymentMethodBtnActive: {
        backgroundColor: '#1E90FF',
        borderColor: '#1E90FF',
    },
    paymentMethodText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 8,
    },
    paymentMethodTextActive: {
        color: '#fff',
    },
    calendarTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1E90FF',
        marginBottom: 16,
    },
    calendarDateBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#f0f4ff',
        marginBottom: 8,
        width: '100%',
        alignItems: 'center',
    },
    calendarDateText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    calendarCancelBtn: {
        marginTop: 8,
        padding: 8,
    },
    calendarCancelText: {
        color: '#191919ff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardModalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardModalBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: 340,
        alignItems: 'center',
        elevation: 8,
    },
    cardModalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#92c8feff',
        marginBottom: 16,
    },
    cardInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#f8f9fa',
    },
    cardLabel: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    countryDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        width: 180,
        justifyContent: 'space-between',
    },
    countryText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    addCardBtnFull: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
        width: 240,
    },
    addCardBtnTextFull: {
        color: '#fff',
        fontWeight: 'bold',
        bottom: 2,
        fontSize: 16,
        letterSpacing: 1,
    },
    cardModalBtn: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#f0f4ff',
        marginHorizontal: 4,
    },
    cardModalBtnText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        border: 10,
        marginHorizontal: 4,
        fontSize: 15,
    },
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    addressBlock: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    addressLabel: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 4,
    },
    addressText: {
        color: '#222',
        fontSize: 15,
        marginBottom: 2,
        lineHeight: 20,
    },
    changeText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10,
    },
    deliveryTypeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    deliveryTypeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        backgroundColor: '#fff',
    },
    deliveryTypeBtnActive: {
        backgroundColor: '#1E90FF',
        borderColor: '#1E90FF',
    },
    deliveryTypeText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
    },
    deliveryTypeTextActive: {
        color: '#fff',
    },
    timeSection: {
        marginBottom: 18,
    },
    dateLabel: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    dateText: {
        color: '#fffcfcff',
        fontSize: 15,
        marginBottom: 10,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    timeBtn: {
        backgroundColor: '#fff',
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        marginRight: 10,
    },
    timeBtnActive: {
        backgroundColor: '#1E90FF',
    },
    timeBtnText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    timeBtnTextActive: {
        color: '#fff',
    },
    paymentLabel: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8,
    },
    cardBlock: {
        backgroundColor: '#1E90FF',
        borderRadius: 18,
        padding: 18,
        marginBottom: 8,
        elevation: 2,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardType: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardHolder: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
    },
    cardExpiry: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1,
    },
    addCardBtn: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    addCardText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    summaryBlock: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    summaryLabel: {
        color: '#888',
        fontSize: 15,
    },
    summaryValue: {
        color: '#888',
        fontSize: 15,
        fontWeight: 'bold',
    },
    summaryLabelTotal: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 17,
    },
    summaryValueTotal: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 17,
    },
    placeOrderBtn: {
        backgroundColor: '#1E90FF',
        borderRadius: 20,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#1E90FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    placeOrderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
});

export default CheckoutScreen;
