class CustomerSupportService {
  static async createSupportCard(userId, cardData) {
    try {
      const supportCard = await CustomerSupportCardModel.create({ userId, ...cardData });
      return supportCard;
    } catch (error) {
      throw new Error('Error creating a customer support card');
    }
  }

}

module.exports = CustomerSupportService;
