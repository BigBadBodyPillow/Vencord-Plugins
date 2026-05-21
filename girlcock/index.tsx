
import { MessageObject } from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";


const urlList = [
    { title: "vxtwitter", url: "https://vxtwitter.com/" },
    { title: "fixupx", url: "https://fixupx.com/" },
    { title: "fxtwitter", url: "https://fxtwitter.com/" },
    { title: "hotyurisex", url: "https://hotyurisex.com/" },
    { title: "hitlerx", url: "https://hitlerx.com/" },
    { title: "imthehottest18yearoldononlyfansx", url: "https://imthehottest18yearoldononlyfansx.com/" }
    // { title: "girlcockx", url: "https://girlcockx.com" },
    // { title: "boycuntx", url: "https://boycuntx.com/" },
    // { title: "yaoisex", url: "https://yaoisex.com/" },
    // { title: "niggerfaggotx", url: "https://niggerfaggotx.com/" },
];

const settings = definePluginSettings({
    EmbedURL: {
        type: OptionType.SELECT,
        description: "Status to set while playing a game",
        options: [
            {
                label: urlList[0].title,
                value: urlList[0].url,
                default: true
            },
            {
                label: urlList[1].title,
                value: urlList[1].url,

            },
            {
                label: urlList[2].title,
                value: urlList[2].url,
            },
            {
                label: urlList[3].title,
                value: urlList[3].url,
            },
            {
                label: urlList[4].title,
                value: urlList[4].url,
            },
            {
                label: urlList[5].title,
                value: urlList[5].url,
            }
            // {
            //     label: "girlcockx",
            //     value: "https://girlcockx.com/",
            // },
            // {
            //     label: "boycuntx",
            //     value: "https://boycuntx.com/",
            // },
            // {
            //     label: "yaoisex",
            //     value: "https://yaoisex.com/",
            // },
            // {
            //     label: "niggerfaggotx",
            //     value: "https://niggerfaggotx.com/",
            // },
        ]
    },
    Random: {
        type: OptionType.BOOLEAN,
        description: "Status to set while playing a game",
    }
});



const replaceMessage = (message: MessageObject, url: string) => {
    // only process messages from x.com links
    const replaceString = /https:\/\/x\.com\//;

    if (replaceString.test(message.content)) {
        message.content = message.content.replace(replaceString, url);
    }
};

const getRandomUrl = (urls: { url: string; }[]) => {
    return urls[Math.floor(Math.random() * urls.length)].url;
};


export default definePlugin({
    name: "x embedder",
    description:
        "replaces x links to fix embedding",
    authors: [{
        name: "BigBadBodyPillow",
        id: 244425759739871233n
    }],
    settings: settings,

    onBeforeMessageSend(_, msg: MessageObject) {

        const embedUrl = settings.store.Random
            ? getRandomUrl(urlList)
            : settings.store.EmbedURL;

        replaceMessage(msg, embedUrl);
    },
});
