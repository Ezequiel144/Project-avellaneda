import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDirection extends Struct.ComponentSchema {
  collectionName: 'components_shared_directions';
  info: {
    displayName: 'direction';
  };
  attributes: {
    country: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    locality: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    number: Schema.Attribute.Integer & Schema.Attribute.Required;
    postalcode: Schema.Attribute.Integer & Schema.Attribute.Required;
    province: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    street: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface SharedLinkbutton extends Struct.ComponentSchema {
  collectionName: 'components_shared_linkbuttons';
  info: {
    displayName: 'linkbutton';
  };
  attributes: {
    link: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialmedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_socialmedias';
  info: {
    displayName: 'socialmedia';
  };
  attributes: {
    link: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'tag';
  };
  attributes: {
    itemtag: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.direction': SharedDirection;
      'shared.linkbutton': SharedLinkbutton;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.socialmedia': SharedSocialmedia;
      'shared.tag': SharedTag;
    }
  }
}
