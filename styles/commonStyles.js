
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafd',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 10,
    boxShadow: '0 2px 4px rgba(0, 123, 255, 0.15)',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  link: {
    color: '#555',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
  },
  input: {
      height: 50,
      width: '100%',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 16,
  },
});
