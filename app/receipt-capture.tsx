
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function ReceiptCaptureScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      console.log('Receipt image selected:', result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      console.log('Receipt photo taken:', result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const processReceipt = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select or take a photo of your receipt');
      return;
    }

    setIsProcessing(true);

    // TODO: Backend Integration - Upload receipt image to backend for OCR processing with OpenAI Vision
    // Example: 
    // const formData = new FormData();
    // formData.append('image', { uri: selectedImage, type: 'image/jpeg', name: 'receipt.jpg' });
    // await fetch('/api/receipts/process', { method: 'POST', body: formData })
    // The backend will use GPT-5.2 Vision to extract items, prices, ExtraBucks, and totals

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Receipt Processed!',
        'Your receipt has been scanned and items have been extracted. ExtraBucks and rebates have been tracked.',
        [
          {
            text: 'View Details',
            onPress: () => router.back(),
          },
        ]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Capture Receipt',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.instructionCard}>
          <IconSymbol 
            ios_icon_name="doc.text.fill" 
            android_material_icon_name="receipt" 
            size={48} 
            color={colors.primary} 
          />
          <Text style={styles.instructionTitle}>Scan Your CVS Receipt</Text>
          <Text style={styles.instructionText}>
            Take a clear photo of your CVS receipt. Our AI will automatically extract items, prices, ExtraBucks earned, and track rebates.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={takePhoto}
          >
            <IconSymbol 
              ios_icon_name="camera.fill" 
              android_material_icon_name="camera" 
              size={32} 
              color={colors.primary} 
            />
            <Text style={styles.actionButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={pickImage}
          >
            <IconSymbol 
              ios_icon_name="photo.fill" 
              android_material_icon_name="image" 
              size={32} 
              color={colors.primary} 
            />
            <Text style={styles.actionButtonText}>Choose from Library</Text>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Receipt Preview</Text>
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => setSelectedImage(null)}
            >
              <IconSymbol 
                ios_icon_name="trash.fill" 
                android_material_icon_name="delete" 
                size={20} 
                color={colors.error} 
              />
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedImage && (
          <TouchableOpacity 
            style={[styles.processButton, isProcessing && styles.processButtonDisabled]}
            onPress={processReceipt}
            disabled={isProcessing}
          >
            <Text style={styles.processButtonText}>
              {isProcessing ? 'Processing with AI...' : 'Process Receipt'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>What We Extract</Text>
          <View style={styles.featureItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.featureText}>All purchased items and prices</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.featureText}>ExtraBucks earned</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.featureText}>Coupons applied</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.featureText}>Total savings</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.featureText}>Rebate eligibility</Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips for Best Results</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Lay receipt flat on a dark surface</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Ensure all text is visible and in focus</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Use good lighting without shadows</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Capture the entire receipt from top to bottom</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  instructionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  previewContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 8,
    gap: 6,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  processButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  processButtonDisabled: {
    opacity: 0.6,
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuresCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  tipsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    fontWeight: '700',
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});
