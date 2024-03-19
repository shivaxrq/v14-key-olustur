const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { keyDatabase } = require("./keyolustur"); // keyolustur dosyasından keyDatabase dizisini içe aktar

exports.commandBase = {
    slashData: new SlashCommandBuilder()
      .setName("keyliste")
      .setDescription("Oluşturulan anahtarları listeler."),
    cooldown: 0,
    ownerOnly: false,
    slashRun: async (client, interaction) => {
      // Eğer kullanıcı yönetici iznine sahip değilse komutu kullanmasına izin verme
      if (!interaction.member.permissions.has("Administrator")) {
        return interaction.reply("Bu komutu kullanma izniniz yok.");
      }

      if (keyDatabase.length === 0) {
        return interaction.reply("Henüz herhangi bir anahtar oluşturulmamış.");
      }
  
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Anahtar Listesi")
        .setDescription("Oluşturulan anahtarlar:");
  
      keyDatabase.forEach((keyData, index) => {
        embed.addFields(
            { name: `Anahtar ${index + 1}`, value: `**Anahtar:** ${keyData.key}\n**Oluşturan:** ${keyData.creator}\n**Oluşturulma Tarihi:** ${keyData.createdAt.toLocaleString()}` }
          );
        });
  
      interaction.reply({ embeds: [embed] });
    }
  };