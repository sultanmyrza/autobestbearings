<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <a
              style="text-decoration: none;"
              href="mailto:autobestbearings@gmail.com"
            >
              <v-list-item-title v-text="'Email Us'" />
            </a>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn @click.stop="miniVariant = !miniVariant" icon>
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn @click.stop="clipped = !clipped" icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn @click.stop="fixed = !fixed" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <ThemeSwitcher />
      <v-btn v-if="adminPage" @click.stop="rightDrawer = !rightDrawer" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
      <!-- <v-footer>
        <v-card-text class="pt-0">
          Tel：886-2-2289-5853
          <br />
          E-mail：
          <a href="mailto:autobestbearings@gmail.com"
            >autobestbearings@gmail.com</a
          >
          <a href="mailto:salas@autobestbearings.com."
            >salas@autobestbearings.com.</a
          >

          <br />
          Copyright © 2012 AUTO BEST BEARINGS CO., LTD. All Rights Reserved.
        </v-card-text>
      </v-footer> -->
    </v-content>

    <chat-panel v-if="!adminPage" />

    <v-navigation-drawer
      v-if="adminPage"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <contacts-list :customers="customers" />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { customersCollection } from '../plugins/firebase'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import ChatPanel from '@/components/ChatPanel.vue'
import ContactsList from '@/components/ContactsList.vue'

export default {
  components: { ThemeSwitcher, ChatPanel, ContactsList },
  data() {
    return {
      adminPage: false,
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          title: 'About Us',
          to: '/about'
        },
        {
          icon: 'mdi-shopping',
          title: 'Products',
          to: '/products'
        },
        {
          icon: 'mdi-contact-phone',
          title: 'Contact Us',
          to: '/contact'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'auto best bearings',
      customers: []
    }
  },
  watch: {
    $route(to) {
      this.adminPage = this.isAdminPage()
    }
  },
  mounted() {
    this.adminPage = this.isAdminPage()
  },
  methods: {
    isAdminPage() {
      const isAdminPage = this.$route.fullPath.includes('admin')
      if (isAdminPage) {
        customersCollection.onSnapshot((snap) => {
          this.customers = snap.docs.map((doc) => doc.data())
        })
      }
      return isAdminPage
    }
  }
}
</script>
