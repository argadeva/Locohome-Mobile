import React from 'react';
import {Footer, Text, FooterTab, Button, Badge, Icon} from 'native-base';

const FooterBar = () => {
  return (
    <Footer>
      <FooterTab style={{backgroundColor: '#fff'}}>
        <Button vertical style={{borderTopColor: '#3c8af9', borderTopWidth: 5}}>
          <Icon style={{color: '#333'}} name="ios-home" />
          <Text style={{color: '#333'}}>Kamar</Text>
        </Button>
        <Button badge vertical>
          <Badge>
            <Text>1</Text>
          </Badge>
          <Icon style={{color: '#333'}} name="ios-checkbox-outline" />
          <Text style={{color: '#333'}}>Pesanan</Text>
        </Button>
        <Button vertical>
          <Icon style={{color: '#333'}} name="ios-contact" />
          <Text style={{color: '#333'}}>Profil</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterBar;
