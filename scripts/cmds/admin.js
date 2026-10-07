const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
        config: {
                name: "admin",
                version: "1.6",
                author: "NTKhang",
                countDown: 5,
                role: 2,
                description: {
                        vi: "Thêm, xóa, sửa quyền admin",
                        en: "Add, remove, edit admin role"
                },
                category: "box chat",
                guide: {
                        vi: '   {pn} [add | -a] <uid | @tag>: Thêm quyền admin cho người dùng'
                                + '\n     {pn} [remove | -r] <uid | @tag>: Xóa quyền admin của người dùng'
                                + '\n     {pn} [list | -l]: Liệt kê danh sách admin',
                        en: '   {pn} [add | -a] <uid | @tag>: Add admin role for user'
                                + '\n     {pn} [remove | -r] <uid | @tag>: Remove admin role of user'
                                + '\n     {pn} [list | -l]: List all admins'
                }
        },

        langs: {
                vi: {
                        added: "✅ | Đã thêm quyền admin cho %1 người dùng:\n%2",
                        alreadyAdmin: "\n⚠️ | %1 người dùng đã có quyền admin từ trước rồi:\n%2",
                        missingIdAdd: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn thêm quyền admin",
                        removed: "✅ | Đã xóa quyền admin của %1 người dùng:\n%2",
                        notAdmin: "⚠️ | %1 người dùng không có quyền admin:\n%2",
                        missingIdRemove: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn xóa quyền admin",
                        listAdmin: "👑 | Danh sách admin:\n%1"
                },
                en: {
                        added: "✅ | Added admin role for %1 users:\n%2",
                        alreadyAdmin: "\n⚠️ | %1 users already have admin role:\n%2",
                        missingIdAdd: "⚠️ | Please enter ID or tag user to add admin role",
                        removed: "✅ | Removed admin role of %1 users:\n%2",
                        notAdmin: "⚠️ | %1 users don't have admin role:\n%2",
                        missingIdRemove: "⚠️ | Please enter ID or tag user to remove admin role",
                        listAdmin: "「 ADMIN LIST 」\n\u200E\n\u200E\n\u200E%1"
                }
        },

        onStart: async function ({ message, args, event, getLang }) {
                const ownerUID = String(config.godUID || "");
                const ownerName = config.ownerName || "Kaizer";

                if (String(event.senderID) !== ownerUID)
                        return message.reply(`❌ Only ${ownerName} can manage bot admin access.`);

                // Keep bot-wide admin access exclusive to the configured God UID.
                const expectedAdmins = ownerUID ? [ownerUID] : [];
                const currentAdmins = (config.adminBot || []).map(String);
                if (currentAdmins.length !== expectedAdmins.length
                        || currentAdmins.some((uid, index) => uid !== expectedAdmins[index])) {
                        config.adminBot = expectedAdmins;
                        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
                } else {
                        config.adminBot = expectedAdmins;
                }

                switch (args[0]) {
                        case "add":
                        case "-a": {
                                if (!args[1])
                                        return message.reply(getLang("missingIdAdd"));
                                return message.reply(`⛔ Bot admin access is restricted to ${ownerName} (${ownerUID}) and cannot be delegated.`);
                        }
                        case "remove":
                        case "-r": {
                                if (!args[1])
                                        return message.reply(getLang("missingIdRemove"));
                                return message.reply(`⛔ ${ownerName} is the only bot admin and cannot be removed.`);
                        }
                        case "list":
                        case "-l": {
                                return message.reply(getLang("listAdmin", `╰┈➤ ${ownerName}\n(${ownerUID})`));
                        }
                        default:
                                return message.SyntaxError();
                }
        }
};