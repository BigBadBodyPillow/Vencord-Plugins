/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { MessageObject } from "@api/MessageEvents";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "x -> girlcock",
    description:
        "replaces x.com links with girlcockx.com ",
    authors: [],

    onBeforeMessageSend(_, msg: MessageObject) {
        // only when it twiter link
        if (/https:\/\/x\.com\//.test(msg.content)) {
            msg.content = msg.content.replace(
                /https:\/\/x\.com\//g,
                "https://girlcockx.com/",
            );
        }
    },
});
