module.exports = {
    prod: {
        options: {
            removeComments: true
        },
        files: [
            {expand: true, cwd:"./", src:["views/**/*.html", "!views/setup-campaign-builder.html"], dest:"build/"}
        ]
        //expand: true,
        //cwd: "./",
        //src: ["views/**/*.html", "!views/setup-campaign-builder.html"],
        //dest: "build/"
    }
};