const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

// Anahtarları saklamak için bir dizi oluşturalım
const keysDatabase = [];

exports.commandBase = {
  prefixData: {
    name: "keyolustur",
    aliases: ["createkey"]
  },
  slashData: new SlashCommandBuilder()
    .setName("keyolustur")
    .setDescription("Belirtilen tarih aralığında rastgele anahtar oluşturur."),
  cooldown: 0,
  ownerOnly: false,
  slashRun: async (client, interaction) => {
    // Eğer kullanıcı yönetici iznine sahip değilse komutu kullanmasına izin verme
    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply("Bu komutu kullanma izniniz yok.");
    }
    
    const key = generateRandomKey();
    // Anahtar bilgilerini veritabanına ekle
    const keyData = { key: key, creator: interaction.user.tag, createdAt: new Date() };
    keysDatabase.push(keyData);

    // Oluşturulan anahtarı göster
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Yeni Anahtar Oluşturuldu")
      .setDescription(`**Anahtar:** ${keyData.key}\n**Oluşturan:** ${keyData.creator}\n**Oluşturulma Tarihi:** ${keyData.createdAt.toLocaleString()}`);
    
    interaction.reply({ embeds: [embed] });
  }
};

exports.keyDatabase = keysDatabase;

const generateRandomKey = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 10; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};
