import { MessageObject } from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const urlList = [
    { title: "vxtwitter", url: "https://vxtwitter.com/" },
    { title: "fxtwitter", url: "https://fxtwitter.com/" },
    { title: "fixupx", url: "https://fixupx.com/" },
    { title: "fixvx", url: "https://fixvx.com/" },
    { title: "twittpr", url: "https://twittpr.com/" },
    { title: "hotyurisex", url: "https://hotyurisex.com/" },
    { title: "hitlerx", url: "https://hitlerx.com/" },
    {
        title: "imthehottest18yearoldononlyfansx",
        url: "https://imthehottest18yearoldononlyfansx.com/",
    },
    { title: "girlcockx", url: "https://girlcockx.com/" },
    { title: "chudx", url: "https://chudx.com/" },
    { title: "catgirlsex", url: "https://catgirlsex.com/" },
    { title: "furryfeetx", url: "https://furryfeetxx.com/" },
    { title: "autistic.kids", url: "https://autistic.kids/" },
    { title: "goatsx", url: "https://goatsx.com/" },
    { title: "dammitx", url: "https://dammitx.com/" },
    {
        title: "uglyunfunnynazimanchildwithabrokenpenisx",
        url: "https://uglyunfunnynazimanchildwithabrokenpenisx.com/",
    },
    { title: "glorpx", url: "https://glorpx.com/" },
    // { title: "stupidpenisx", url: "https://stupidpenisx.com/" },
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
                default: true,
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
            },
            {
                label: urlList[6].title,
                value: urlList[6].url,
            },
            {
                label: urlList[7].title,
                value: urlList[7].url,
            },
            {
                label: urlList[8].title,
                value: urlList[8].url,
            },
            {
                label: urlList[9].title,
                value: urlList[9].url,
            },
            {
                label: urlList[10].title,
                value: urlList[10].url,
            },
            {
                label: urlList[11].title,
                value: urlList[11].url,
            },
            {
                label: urlList[12].title,
                value: urlList[12].url,
            },
            {
                label: urlList[13].title,
                value: urlList[13].url,
            },
            {
                label: urlList[14].title,
                value: urlList[14].url,
            },
            {
                label: urlList[15].title,
                value: urlList[15].url,
            },
            {
                label: urlList[16].title,
                value: urlList[16].url,
            },
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
        ],
    },
    Random: {
        type: OptionType.BOOLEAN,
        description: "Choose which url to replace x links",
    },
    "Clean URL": {
        type: OptionType.BOOLEAN,
        description: "Remove tracking from links",
    },
});

const replaceMessage = (message: MessageObject, url: string) => {
    const replaceString = /https:\/\/x\.com\/[^\s<>"']+/;
    const match = message.content.match(replaceString);

    if (!match) return;

    const trailingPunctuation = match[0].match(/[.,!?;:]+$/)?.[0] ?? "";
    let link = match[0].slice(0, match[0].length - trailingPunctuation.length);

    if (settings.store["Clean URL"]) {
        const parsedUrl = new URL(link);
        parsedUrl.searchParams.delete("a");
        parsedUrl.searchParams.delete("s");
        link = parsedUrl.toString();
    }

    message.content = message.content.replace(
        match[0],
        `${link}${trailingPunctuation}`,
    );
    message.content = message.content.replace("https://x.com/", url);
};

const getRandomUrl = (urls: { url: string }[]) => {
    return urls[Math.floor(Math.random() * urls.length)].url;
};

export default definePlugin({
    name: "x embedder",
    description: "replaces x links to fix embedding",
    authors: [
        {
            name: "BigBadBodyPillow",
            id: 244425759739871233n,
        },
    ],
    settings: settings,

    onBeforeMessageSend(_, msg: MessageObject) {
        const embedUrl = settings.store.Random
            ? getRandomUrl(urlList)
            : settings.store.EmbedURL;

        replaceMessage(msg, embedUrl);
    },
});
