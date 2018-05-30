import {expect} from "chai";
import {Storefront} from "../../src/storefront";
import request from "supertest";
import {GatewayBFF} from "../../src/gatewayBFF";
import {IGatewayBFFConfiguration} from "../../src/types";
import path from "path";
import {GatewayConfigurator} from "../../src/configurator";
import {CONTENT_REPLACE_SCRIPT, INJECTABLE} from "../../src/enums";

describe('System Tests', function () {
    const closeInstance = (instance: any) => {
        instance.server.close();
        if(instance.gateways){
            Object.values(instance.gateways).forEach((instance: any) => instance.stopUpdating());
        }
    };

    it('should render single fragment', function (done) {
        const gatewayConfigurator = new GatewayConfigurator();
        gatewayConfigurator.register('handler', INJECTABLE.HANDLER, {
            data() {
                return {
                    data: {}
                };
            },
            placeholder() {

            },
            content() {
                return {
                    main: 'Fragment Content'
                };
            }
        });
        gatewayConfigurator.config({
            port: 4451,
            name: 'Browsing',
            url: 'http://localhost:4451/',
            fragments: [
                {
                    name: 'example',
                    render: {
                        url: '/'
                    },
                    version: '1.0.0',
                    testCookie: 'example',
                    versions: {
                        '1.0.0': {
                            assets: [],
                            dependencies: [],
                            handler: 'handler'
                        }
                    }
                }
            ],
            api: [],
            isMobile: true,
            fragmentsFolder: path.join(__dirname, "./fragments")
        } as any);
        const gatewayInstance = new GatewayBFF(gatewayConfigurator);

        const storefrontInstance = new Storefront({
            pages: [
                {
                    url: '/',
                    html: '<template><html><head></head><body><fragment from="Browsing" name="example"></fragment></body></html></template>'
                }
            ],
            port: 4450,
            gateways: [{
                name: 'Browsing',
                url: 'http://localhost:4451/'
            }],
            dependencies: [],
        });

        gatewayInstance.init(() => {
            console.log('Gateway is working');
        });

        storefrontInstance.init(() => {
            console.log('Storefront is working');

            request(storefrontInstance.server.app)
                .get('/healthcheck')
                .expect(200)
                .end(err => {

                    request(storefrontInstance.server.app)
                        .get('/')
                        .expect(200)
                        .end((err, res) => {
                            closeInstance(storefrontInstance);
                            closeInstance(gatewayInstance);
                            expect(res.text).to.eq(`<html><head>${CONTENT_REPLACE_SCRIPT}</head><body><div id="example" puzzle-fragment="example" puzzle-gateway="Browsing" puzzle-chunk="example_main"></div><div style="display: none;" puzzle-fragment="example" puzzle-chunk-key="example_main">Fragment Content</div><script>$p('[puzzle-chunk="example_main"]','[puzzle-chunk-key="example_main"]');</script></body></html>`);
                            done(err);
                        });
                });
        });
    });

    it('should render single static fragment', function (done) {
        const gatewayConfigurator = new GatewayConfigurator();
        gatewayConfigurator.register('handler', INJECTABLE.HANDLER, {
            data() {
                return {
                    data: {}
                };
            },
            placeholder() {

            },
            content() {
                return {
                    main: 'Fragment Content'
                };
            }
        });
        gatewayConfigurator.config({
            port: 4451,
            name: 'Browsing',
            url: 'http://localhost:4451/',
            fragments: [
                {
                    name: 'example',
                    render: {
                        url: '/',
                        static: true
                    },
                    version: '1.0.0',
                    testCookie: 'example',
                    versions: {
                        '1.0.0': {
                            assets: [],
                            dependencies: [],
                            handler: 'handler'
                        }
                    }
                }
            ],
            api: [],
            isMobile: true,
            fragmentsFolder: path.join(__dirname, "./fragments")
        } as any);
        const gatewayInstance = new GatewayBFF(gatewayConfigurator);

        const storefrontInstance = new Storefront({
            pages: [
                {
                    url: '/',
                    html: '<template><html><head></head><body><fragment from="Browsing" name="example"></fragment></body></html></template>'
                }
            ],
            port: 4450,
            gateways: [{
                name: 'Browsing',
                url: 'http://localhost:4451/'
            }],
            dependencies: [],
        });

        gatewayInstance.init(() => {
            console.log('Gateway is working');
        });

        storefrontInstance.init(() => {
            console.log('Storefront is working');

            request(storefrontInstance.server.app)
                .get('/healthcheck')
                .expect(200)
                .end(err => {

                    request(storefrontInstance.server.app)
                        .get('/')
                        .expect(200)
                        .end((err, res) => {
                            closeInstance(storefrontInstance);
                            closeInstance(gatewayInstance);
                            expect(res.text).to.eq(`<html><head/><body><div id="example" puzzle-fragment="example" puzzle-gateway="Browsing" fragment-partial="main">Fragment Content</div></body></html>`);
                            done(err);
                        });
                });
        });
    });

    it('should render single fragment with header', function (done) {
        const gatewayConfigurator = new GatewayConfigurator();
        gatewayConfigurator.register('handler', INJECTABLE.HANDLER, {
            data() {
                return {
                    data: {},
                    $headers: {
                        custom: 'custom value'
                    }
                };
            },
            placeholder() {

            },
            content() {
                return {
                    main: 'Fragment Content'
                };
            }
        });
        gatewayConfigurator.config({
            port: 4451,
            name: 'Browsing',
            url: 'http://localhost:4451/',
            fragments: [
                {
                    name: 'example',
                    render: {
                        url: '/'
                    },
                    version: '1.0.0',
                    testCookie: 'example',
                    versions: {
                        '1.0.0': {
                            assets: [],
                            dependencies: [],
                            handler: 'handler'
                        }
                    }
                }
            ],
            api: [],
            isMobile: true,
            fragmentsFolder: path.join(__dirname, "./fragments")
        } as any);
        const gatewayInstance = new GatewayBFF(gatewayConfigurator);

        const storefrontInstance = new Storefront({
            pages: [
                {
                    url: '/',
                    html: '<template><html><head></head><body><fragment from="Browsing" name="example" primary></fragment></body></html></template>'
                }
            ],
            port: 4450,
            gateways: [{
                name: 'Browsing',
                url: 'http://localhost:4451/'
            }],
            dependencies: [],
        });

        gatewayInstance.init(() => {
            console.log('Gateway is working');
        });

        storefrontInstance.init(() => {
            console.log('Storefront is working');

            request(storefrontInstance.server.app)
                .get('/healthcheck')
                .expect(200)
                .end(err => {

                    request(storefrontInstance.server.app)
                        .get('/')
                        .expect(200)
                        .end((err, res) => {
                            closeInstance(storefrontInstance);
                            closeInstance(gatewayInstance);
                            expect(res.header['custom']).to.eq('custom value');
                            expect(res.text).to.eq(`<html><head/><body><div id="example" puzzle-fragment="example" puzzle-gateway="Browsing">Fragment Content</div></body></html>`);
                            done(err);
                        });
                });
        });
    });

    it('should render single fragment with header without data', function (done) {
        const gatewayConfigurator = new GatewayConfigurator();
        gatewayConfigurator.register('handler', INJECTABLE.HANDLER, {
            data() {
                return {
                    $headers: {
                        location: 'https://www.trendyol.com'
                    },
                    $status: 301
                };
            },
            placeholder() {

            },
            content() {
                return {
                    main: 'Fragment Content'
                };
            }
        });
        gatewayConfigurator.config({
            port: 4451,
            name: 'Browsing',
            url: 'http://localhost:4451/',
            fragments: [
                {
                    name: 'example',
                    render: {
                        url: '/'
                    },
                    version: '1.0.0',
                    testCookie: 'example',
                    versions: {
                        '1.0.0': {
                            assets: [],
                            dependencies: [],
                            handler: 'handler'
                        }
                    }
                }
            ],
            api: [],
            isMobile: true,
            fragmentsFolder: path.join(__dirname, "./fragments")
        } as any);
        const gatewayInstance = new GatewayBFF(gatewayConfigurator);

        const storefrontInstance = new Storefront({
            pages: [
                {
                    url: '/',
                    html: '<template><html><head></head><body><fragment from="Browsing" name="example" primary></fragment></body></html></template>'
                }
            ],
            port: 4450,
            gateways: [{
                name: 'Browsing',
                url: 'http://localhost:4451/'
            }],
            dependencies: [],
        });

        gatewayInstance.init(() => {
            console.log('Gateway is working');
        });

        storefrontInstance.init(() => {
            console.log('Storefront is working');

            request(storefrontInstance.server.app)
                .get('/healthcheck')
                .expect(200)
                .end(err => {

                    request(storefrontInstance.server.app)
                        .get('/')
                        .redirects(0)
                        .expect(301)
                        .end((err, res) => {
                            closeInstance(storefrontInstance);
                            closeInstance(gatewayInstance);
                            expect(res.header['location']).to.eq('https://www.trendyol.com');
                            done(err);
                        });
                });
        });
    });
});