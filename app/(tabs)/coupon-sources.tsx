
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface CouponSource {
  id: string;
  type: 'newspaper' | 'instore' | 'manufacturer' | 'digital';
  name: string;
  location: string;
  date: string;
  expirationDate?: string;
  value?: string;
  notes?: string;
}

export default function CouponSourcesScreen() {
  const [sources, setSources] = useState<CouponSource[]>([
    {
      id: '1',
      type: 'newspaper',
      name: 'SmartSource Insert',
      location: 'Sunday Paper',
      date: '2025-01-19',
      expirationDate: '2025-02-19',
      notes: 'P&G coupons, household items',
    },
    {
      id: '2',
      type: 'newspaper',
      name: 'RedPlum Insert',
      location: 'Sunday Paper',
      date: '2025-01-19',
      expirationDate: '2025-02-19',
      notes: 'Food & beauty coupons',
    },
    {
      id: '3',
      type: 'instore',
      name: 'CVS Coupon Center',
      location: 'CVS Store #4521',
      date: '2025-01-18',
      notes: 'Red coupon machine by entrance',
    },
    {
      id: '4',
      type: 'manufacturer',
      name: 'P&G Brandsaver',
      location: 'Mail',
      date: '2025-01-15',
      expirationDate: '2025-03-31',
      notes: 'Tide, Pampers, Gillette coupons',
    },
  ]);

  const [filterType, setFilterType] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'newspaper':
        return 'description';
      case 'instore':
        return 'store';
      case 'manufacturer':
        return 'local-offer';
      case 'digital':
        return 'phone';
      default:
        return 'local-offer';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'newspaper':
        return '#3B82F6';
      case 'instore':
        return '#8B5CF6';
      case 'manufacturer':
        return '#EC4899';
      case 'digital':
        return '#10B981';
      default:
        return colors.primary;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'newspaper':
        return 'Newspaper Insert';
      case 'instore':
        return 'In-Store';
      case 'manufacturer':
        return 'Manufacturer';
      case 'digital':
        return 'Digital';
      default:
        return type;
    }
  };

  const filteredSources = filterType === 'all' 
    ? sources 
    : sources.filter(s => s.type === filterType);

  const addNewSource = () => {
    Alert.alert(
      'Add Coupon Source',
      'Track where you found coupons',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: () => {
            // TODO: Backend Integration - Save new coupon source to database
            console.log('Add new coupon source');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Coupon Sources</Text>
            <Text style={styles.headerSubtitle}>Track where to find coupons</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addNewSource}
          >
            <IconSymbol 
              ios_icon_name="plus" 
              android_material_icon_name="add" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            style={[styles.filterTab, filterType === 'all' && styles.filterTabActive]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>
              All Sources
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filterType === 'newspaper' && styles.filterTabActive]}
            onPress={() => setFilterType('newspaper')}
          >
            <IconSymbol 
              ios_icon_name="newspaper" 
              android_material_icon_name="description" 
              size={16} 
              color={filterType === 'newspaper' ? '#FFFFFF' : colors.textSecondary} 
            />
            <Text style={[styles.filterText, filterType === 'newspaper' && styles.filterTextActive]}>
              Newspapers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filterType === 'instore' && styles.filterTabActive]}
            onPress={() => setFilterType('instore')}
          >
            <IconSymbol 
              ios_icon_name="storefront" 
              android_material_icon_name="store" 
              size={16} 
              color={filterType === 'instore' ? '#FFFFFF' : colors.textSecondary} 
            />
            <Text style={[styles.filterText, filterType === 'instore' && styles.filterTextActive]}>
              In-Store
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filterType === 'manufacturer' && styles.filterTabActive]}
            onPress={() => setFilterType('manufacturer')}
          >
            <IconSymbol 
              ios_icon_name="tag" 
              android_material_icon_name="local-offer" 
              size={16} 
              color={filterType === 'manufacturer' ? '#FFFFFF' : colors.textSecondary} 
            />
            <Text style={[styles.filterText, filterType === 'manufacturer' && styles.filterTextActive]}>
              Manufacturer
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <IconSymbol 
              ios_icon_name="lightbulb" 
              android_material_icon_name="info" 
              size={24} 
              color={colors.accent} 
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Track Your Coupon Sources</Text>
              <Text style={styles.infoText}>
                Keep track of where you find coupons so you never miss a deal. Check weekly for new newspaper inserts!
              </Text>
            </View>
          </View>

          {filteredSources.map((source) => (
            <View key={source.id} style={styles.sourceCard}>
              <View style={styles.sourceHeader}>
                <View style={[styles.typeIcon, { backgroundColor: getTypeColor(source.type) + '20' }]}>
                  <IconSymbol 
                    ios_icon_name="tag" 
                    android_material_icon_name={getTypeIcon(source.type)} 
                    size={24} 
                    color={getTypeColor(source.type)} 
                  />
                </View>
                <View style={styles.sourceInfo}>
                  <Text style={styles.sourceName}>{source.name}</Text>
                  <View style={styles.typeTag}>
                    <Text style={[styles.typeTagText, { color: getTypeColor(source.type) }]}>
                      {getTypeLabel(source.type)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.sourceDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol 
                    ios_icon_name="location" 
                    android_material_icon_name="place" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.detailText}>{source.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol 
                    ios_icon_name="calendar" 
                    android_material_icon_name="calendar-today" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.detailText}>Found: {source.date}</Text>
                </View>
                {source.expirationDate && (
                  <View style={styles.detailRow}>
                    <IconSymbol 
                      ios_icon_name="clock" 
                      android_material_icon_name="schedule" 
                      size={16} 
                      color={colors.textSecondary} 
                    />
                    <Text style={styles.detailText}>Expires: {source.expirationDate}</Text>
                  </View>
                )}
              </View>

              {source.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesText}>{source.notes}</Text>
                </View>
              )}
            </View>
          ))}

          {filteredSources.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol 
                ios_icon_name="magnifyingglass" 
                android_material_icon_name="search" 
                size={48} 
                color={colors.textSecondary} 
              />
              <Text style={styles.emptyText}>No coupon sources found</Text>
              <Text style={styles.emptySubtext}>Add your first source to start tracking!</Text>
            </View>
          )}
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
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    gap: 6,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.accent + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sourceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  typeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sourceDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  notesContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  notesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
