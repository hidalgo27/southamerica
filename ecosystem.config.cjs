module.exports = {
    apps: [
        {
            name: 'machupicchu-company',
            port: '6001',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
