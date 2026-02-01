import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Wallet, X, CreditCard, TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import BottomModal from './customComponents/BottomModal';

const { width, height } = Dimensions.get('window');

// Mock wallet data
const walletData = {
  balance: 1250.75,
  currency: 'INR',
  transactions: [
    {
      id: '1',
      type: 'credit',
      amount: 500.00,
      description: 'Premium Plan Purchase',
      date: '2024-01-15',
      time: '14:30',
      icon: TrendingUp,
    },
    {
      id: '2',
      type: 'debit',
      amount: -150.00,
      description: 'Chat Session - Mr. Krishnam',
      date: '2024-01-14',
      time: '16:45',
      icon: TrendingDown,
    },
    {
      id: '3',
      type: 'credit',
      amount: 200.00,
      description: 'Referral Bonus',
      date: '2024-01-13',
      time: '10:15',
      icon: TrendingUp,
    },
    {
      id: '4',
      type: 'debit',
      amount: -75.00,
      description: 'Horoscope Report',
      date: '2024-01-12',
      time: '09:20',
      icon: TrendingDown,
    },
  ],
};

interface WalletPanelProps {
  visible: boolean;
  onClose: () => void;
}

export default function WalletPanel({ visible, onClose }: WalletPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTransactions = walletData.transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  const formatCurrency = (amount: number) => {
    return `${amount >= 0 ? '+' : ''}₹${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      header={
        <>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Wallet size={24} color={COLORS.primary} />
              <Text style={styles.headerTitle}>My Wallet</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </>
      }
      showCloseButton={false}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <View style={styles.panel}>
          {/* Header */}
       

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <CreditCard size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.balanceAmount}>
                ₹{walletData.balance.toFixed(2)}
              </Text>
              <Text style={styles.balanceSubtitle}>Available for use</Text>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Plus size={20} color={COLORS.textInverse} />
                <Text style={styles.actionButtonText}>Add Money</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonSecondary]}
              >
                <ArrowUpRight size={20} color={COLORS.primary} />
                <Text style={styles.actionButtonTextSecondary}>Send</Text>
              </TouchableOpacity>
            </View>

            {/* Transaction Filters */}
            <View style={styles.filters}>
              {[
                { key: 'all', label: 'All' },
                { key: 'credit', label: 'Credits' },
                { key: 'debit', label: 'Debits' },
              ].map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.key && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedFilter === filter.key &&
                        styles.filterButtonTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Transaction History */}
            <View style={styles.transactionSection}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>

              {filteredTransactions.map(transaction => {
                const IconComponent = transaction.icon;
                return (
                  <View key={transaction.id} style={styles.transactionItem}>
                    <View style={styles.transactionIcon}>
                      <IconComponent
                        size={20}
                        color={
                          transaction.type === 'credit'
                            ? COLORS.success
                            : COLORS.error
                        }
                      />
                    </View>

                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {formatDate(transaction.date)} at {transaction.time}
                      </Text>
                    </View>

                    <View style={styles.transactionAmount}>
                      <Text
                        style={[
                          styles.transactionAmountText,
                          transaction.type === 'credit'
                            ? styles.transactionAmountPositive
                            : styles.transactionAmountNegative,
                        ]}
                      >
                        {formatCurrency(transaction.amount)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  overlayTouchable: {
    flex: 1,
  },
  panel: {
    height: height * 0.8,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingTop: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: SPACING.xs,
  },
  balanceCard: {
    backgroundColor: COLORS.cardBackground,
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.sm,
  },
  balanceLabel: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
  },
  balanceAmount: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES['3xl'],
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  balanceSubtitle: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.sm,
  },
  quickActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.xs,
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
  },
  actionButtonTextSecondary: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  filterButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
  },
  transactionSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
  },
  transactionIcon: {
    marginRight: SPACING.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  transactionDate: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.xs,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
  },
  transactionAmountPositive: {
    color: COLORS.success,
  },
  transactionAmountNegative: {
    color: COLORS.error,
  },
});
