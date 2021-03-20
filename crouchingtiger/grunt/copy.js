module.exports = {
    dev: {
        files: [
            // includes files within path and its sub-directories
            {expand: true, src: ["views/**"],  dest: "generated/"},

            {expand: true, src: ["fonts/**"],  dest: "generated/", cwd:"assets"},
            {expand: true, src: ["assets/**"], dest: "generated/"},
            {expand: true, src: ["img/**"],    dest: "generated/"},
            {expand: true, src: ["images/**"], dest: "generated/"},
            {expand: true, src: ["docs/**"],   dest: "generated/"},

            // copy a single file
            {expand: true, src: "grunt/test/index.html", dest:"generated/", filter:"isFile", flatten: true},
            {expand: true, src: "favicon.png",           dest:"generated/", filter:"isFile", flatten: true}
        ]
    },
    prod: {
        files: [
            // includes files within path and its sub-directories
            {expand: true, src: ["views/**"],  dest: "build/"},

            {expand: true, src: ["fonts/**"],  dest: "build/", cwd:"assets"},
            {expand: true, src: ["assets/**"], dest: "build/"},
            {expand: true, src: ["img/**"],    dest: "build/"},
            {expand: true, src: ["images/**"], dest: "build/"},
            {expand: true, src: ["docs/**"],   dest: "build/"},

            // copy a single file
            {expand: true, src: "grunt/test/index.html", dest:"build/", filter:"isFile", flatten: true},
            {expand: true, src: "favicon.png",           dest:"build/", filter:"isFile", flatten: true}
        ]
    }
};