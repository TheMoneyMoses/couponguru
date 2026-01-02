
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface WeeklyInsert {
  id: string;
  name: string;
  date: string;
  newspaper: string;
  categories: string[];
  topDeals: string[];
  available: boolean;
}

export default function WeeklyInsertsScreen() {
  const [currentWeek] = useState('January 19-25, 2025');
  
  const [inserts, setInserts] = useState<WeeklyInsert[]>([
    {
      id: '1',
      name: 'SmartSource',
      date: '2025-01-19',
      newspaper: 'Sunday Paper',
      categories: ['Household', 'Personal Care', 'Food'],
      topDeals: ['$3 off Tide Pods', '$2 off Crest Toothpaste', '$1 off Cheerios'],
      available: true,
    },
    {
      id: '2',
      name: 'RedPlum',
      date: '2025-01-19',
      newspaper: 'Sunday Paper',
      categories: ['Beauty', 'Food', 'Pet Care'],
      topDeals: ['$5 off L\'Oreal', '$1.50 off Purina', 'BOGO Garnier'],
      available: true,
    },
    {
      id: '3',
      name: 'P&G Brandsaver',
      date: '2025-01-19',
      newspaper: 'Sunday Paper',
      categories: ['Household', 'Baby', 'Personal Care'],
      topDeals: ['$2 off Pampers', '$1 off Gillette', '$3 off Cascade'],
      available: true,
    },
    {
      id: '4',
      name: 'Unilever Insert',
      date: '2025-01-26',
      newspaper: 'Sunday Paper (Next Week)',
      categories: ['Food', 'Personal Care', 'Household'],
      topDeals: ['Coming Soon'],
      available: false,
    },
  ]);

  const availableInserts = inserts.filter(i => i.available);
  const upcomingInserts = inserts.filter(i => !i.available);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Weekly Inserts</Text>
            <Text style={styles.headerSubtitle}>{currentWeek}</Text>
          </View>
          <TouchableOpacity style={styles.calendarButton}>
            <IconSymbol 
              ios_icon_name="calendar" 
              android_material_icon_name="calendar-today" 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Guide */}
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
              <IconSymbol 
                ios_icon_name="newspaper" 
                android_material_icon_name="description" 
                size={28} 
                color={colors.primary} 
              />
              <Text style={styles.guideTitle}>Sunday Paper Inserts</Text>
            </View>
            <Text style={styles.guideText}>
              Most coupon inserts come in Sunday newspapers. Check your local paper or ask neighbors to save theirs!
            </Text>
            <View style={styles.guideTips}>
              <View style={styles.tipRow}>
                <IconSymbol 
                  ios_icon_name="checkmark" 
                  android_material_icon_name="check" 
                  size={16} 
                  color={colors.accent} 
                />
                <Text style={styles.tipText}>Buy multiple papers for more coupons</Text>
              </View>
              <View style={styles.tipRow}>
                <IconSymbol 
                  ios_icon_name="checkmark" 
                  android_material_icon_name="check" 
                  size={16} 
                  color={colors.accent} 
                />
                <Text style={styles.tipText}>Not all papers have inserts every week</Text>
              </View>
              <View style={styles.tipRow}>
                <IconSymbol 
                  ios_icon_name="checkmark" 
                  android_material_icon_name="check" 
                  size={16} 
                  color={colors.accent} 
                />
                <Text style={styles.tipText}>Regional variations may apply</Text>
              </View>
            </View>
          </View>

          {/* This Week's Inserts */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Week's Inserts</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{availableInserts.length}</Text>
            </View>
          </View>

          {availableInserts.map((insert) => (
            <View key={insert.id} style={styles.insertCard}>
              <View style={styles.insertHeader}>
                <View style={styles.insertTitleContainer}>
                  <Text style={styles.insertName}>{insert.name}</Text>
                  <View style={styles.availableBadge}>
                    <IconSymbol 
                      ios_icon_name="checkmark" 
                      android_material_icon_name="check-circle" 
                      size={14} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.availableText}>Available Now</Text>
                  </View>
                </View>
              </View>

              <View style={styles.insertInfo}>
                <View style={styles.infoRow}>
                  <IconSymbol 
                    ios_icon_name="newspaper" 
                    android_material_icon_name="description" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.infoText}>{insert.newspaper}</Text>
                </View>
                <View style={styles.infoRow}>
                  <IconSymbol 
                    ios_icon_name="calendar" 
                    android_material_icon_name="calendar-today" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.infoText}>{insert.date}</Text>
                </View>
              </View>

              <View style={styles.categoriesContainer}>
                <Text style={styles.categoriesLabel}>Categories:</Text>
                <View style={styles.categoriesList}>
                  {insert.categories.map((category, index) => (
                    <View key={index} style={styles.categoryTag}>
                      <Text style={styles.categoryText}>{category}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.dealsContainer}>
                <Text style={styles.dealsLabel}>Top Deals:</Text>
                {insert.topDeals.map((deal, index) => (
                  <View key={index} style={styles.dealRow}>
                    <IconSymbol 
                      ios_icon_name="tag" 
                      android_material_icon_name="local-offer" 
                      size={14} 
                      color={colors.accent} 
                    />
                    <Text style={styles.dealText}>{deal}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Upcoming Inserts */}
          {upcomingInserts.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Coming Next Week</Text>
                <View style={[styles.countBadge, { backgroundColor: colors.textSecondary + '20' }]}>
                  <Text style={[styles.countText, { color: colors.textSecondary }]}>
                    {upcomingInserts.length}
                  </Text>
                </View>
              </View>

              {upcomingInserts.map((insert) => (
                <View key={insert.id} style={[styles.insertCard, styles.upcomingCard]}>
                  <View style={styles.insertHeader}>
                    <View style={styles.insertTitleContainer}>
                      <Text style={styles.insertName}>{insert.name}</Text>
                      <View style={[styles.availableBadge, { backgroundColor: colors.textSecondary }]}>
                        <IconSymbol 
                          ios_icon_name="clock" 
                          android_material_icon_name="schedule" 
                          size={14} 
                          color="#FFFFFF" 
                        />
                        <Text style={styles.availableText}>Coming Soon</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.insertInfo}>
                    <View style={styles.infoRow}>
                      <IconSymbol 
                        ios_icon_name="newspaper" 
                        android_material_icon_name="description" 
                        size={16} 
                        color={colors.textSecondary} 
                      />
                      <Text style={styles.infoText}>{insert.newspaper}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <IconSymbol 
                        ios_icon_name="calendar" 
                        android_material_icon_name="calendar-today" 
                        size={16} 
                        color={colors.textSecondary} 
                      />
                      <Text style={styles.infoText}>{insert.date}</Text>
                    </View>
                  </View>

                  <View style={styles.categoriesContainer}>
                    <Text style={styles.categoriesLabel}>Categories:</Text>
                    <View style={styles.categoriesList}>
                      {insert.categories.map((category, index) => (
                        <View key={index} style={styles.categoryTag}>
                          <Text style={styles.categoryText}>{category}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Where to Find */}
          <View style={styles.whereToFindCard}>
            <Text style={styles.whereToFindTitle}>Where to Find Inserts</Text>
            <View style={styles.locationsList}>
              <View style={styles.locationItem}>
                <IconSymbol 
                  ios_icon_name="newspaper" 
                  android_material_icon_name="description" 
                  size={20} 
                  color={colors.primary} 
                />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>Sunday Newspapers</Text>
                  <Text style={styles.locationDesc}>Most common source - check local stores</Text>
                </View>
              </View>
              <View style={styles.locationItem}>
                <IconSymbol 
                  ios_icon_name="mail" 
                  android_material_icon_name="email" 
                  size={20} 
                  color={colors.primary} 
                />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>Mailbox</Text>
                  <Text style={styles.locationDesc}>Manufacturer mailers & ValPak</Text>
                </View>
              </View>
              <View style={styles.locationItem}>
                <IconSymbol 
                  ios_icon_name="storefront" 
                  android_material_icon_name="store" 
                  size={20} 
                  color={colors.primary} 
                />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>In-Store</Text>
                  <Text style={styles.locationDesc}>Coupon machines, tear pads, blinkies</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  calendarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  guideCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  guideText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  guideTips: {
    gap: 8,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  countBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  insertCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  upcomingCard: {
    opacity: 0.7,
  },
  insertHeader: {
    marginBottom: 12,
  },
  insertTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insertName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  availableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insertInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  categoriesContainer: {
    marginBottom: 12,
  },
  categoriesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  dealsContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  dealsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  dealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  dealText: {
    fontSize: 14,
    color: colors.text,
  },
  whereToFindCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  whereToFindTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  locationsList: {
    gap: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  locationDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
